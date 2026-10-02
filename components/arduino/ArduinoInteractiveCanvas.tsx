'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createArduinoUnoModel, ArduinoComponentId, ArduinoModelNodes } from './ArduinoUnoModel';

export interface ArduinoCanvasProps {
  onSelectComponent: (id: ArduinoComponentId) => void;
  onHoverComponent: (id: ArduinoComponentId | null) => void;
  isLedLActive: boolean;
  isResetting: boolean;
  cameraPreset: 'isometric' | 'atmega' | 'pins' | 'power' | 'reset';
  autoRotate: boolean;
}

export function ArduinoInteractiveCanvas({
  onSelectComponent,
  onHoverComponent,
  isLedLActive,
  isResetting,
  cameraPreset,
  autoRotate,
}: ArduinoCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const nodesRef = useRef<ArduinoModelNodes | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Camera targets & positions
  const cameraTargetRef = useRef(new THREE.Vector3(0, 0, 0));
  const sphericalRef = useRef(new THREE.Spherical(10.0, Math.PI / 3.2, Math.PI / 3.8));
  const targetSphericalRef = useRef(new THREE.Spherical(10.0, Math.PI / 3.2, Math.PI / 3.8));

  // Callbacks in refs to avoid useEffect recreation
  const onSelectRef = useRef(onSelectComponent);
  const onHoverRef = useRef(onHoverComponent);
  useEffect(() => {
    onSelectRef.current = onSelectComponent;
    onHoverRef.current = onHoverComponent;
  });

  // Camera preset handler
  useEffect(() => {
    if (cameraPreset === 'atmega') {
      cameraTargetRef.current.set(0.9, 0.2, 0.95);
      targetSphericalRef.current.radius = 5.5;
      targetSphericalRef.current.phi = Math.PI / 3.6;
      targetSphericalRef.current.theta = Math.PI / 4.2;
    } else if (cameraPreset === 'pins') {
      cameraTargetRef.current.set(0.8, 0.4, -1.8);
      targetSphericalRef.current.radius = 6.2;
      targetSphericalRef.current.phi = Math.PI / 3.0;
      targetSphericalRef.current.theta = 0.2;
    } else if (cameraPreset === 'power') {
      cameraTargetRef.current.set(-2.2, 0.4, 0.8);
      targetSphericalRef.current.radius = 6.0;
      targetSphericalRef.current.phi = Math.PI / 3.2;
      targetSphericalRef.current.theta = -Math.PI / 3;
    } else {
      cameraTargetRef.current.set(0, 0, 0);
      targetSphericalRef.current.radius = 9.8;
      targetSphericalRef.current.phi = Math.PI / 3.2;
      targetSphericalRef.current.theta = Math.PI / 3.8;
    }
  }, [cameraPreset]);

  // Main Three.js Lifecycle
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#060606');
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(6.5, 7.5, 8.0);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Workbench Pedestal & CAD Grid
    const tableGeo = new THREE.PlaneGeometry(30, 30);
    const tableMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#070707'),
      roughness: 0.85,
      metalness: 0.1,
    });
    const tableMesh = new THREE.Mesh(tableGeo, tableMat);
    tableMesh.rotation.x = -Math.PI / 2;
    tableMesh.position.y = -0.55;
    tableMesh.receiveShadow = true;
    scene.add(tableMesh);

    // Dual Grid Helper (Obsidian / Hairline)
    const gridHelper = new THREE.GridHelper(24, 48, '#262622', '#141412');
    gridHelper.position.y = -0.54;
    scene.add(gridHelper);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.95);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight('#ffffff', 2.4);
    keyLight.position.set(7, 12, 8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#c8ccd4', 1.4);
    rimLight.position.set(-8, 6, -7);
    scene.add(rimLight);

    const creamFillLight = new THREE.PointLight('#E1E0CC', 1.2, 18);
    creamFillLight.position.set(0, 5, 4);
    scene.add(creamFillLight);

    // Build Arduino Uno Model
    const arduinoNodes = createArduinoUnoModel();
    nodesRef.current = arduinoNodes;
    scene.add(arduinoNodes.group);

    // Raycaster for Hover & Click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getIntersects = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      return raycaster.intersectObjects(arduinoNodes.interactiveMeshes, true);
    };

    let hoveredMesh: THREE.Mesh | null = null;

    const onPointerMove = (e: PointerEvent) => {
      const hits = getIntersects(e.clientX, e.clientY);
      if (hits.length > 0) {
        const top = hits[0].object as THREE.Mesh;
        if (top !== hoveredMesh) {
          hoveredMesh = top;
          const cid = top.userData.componentId as ArduinoComponentId;
          onHoverRef.current(cid || null);
          container.style.cursor = 'pointer';
        }
      } else {
        if (hoveredMesh) {
          hoveredMesh = null;
          onHoverRef.current(null);
          container.style.cursor = 'grab';
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      const hits = getIntersects(e.clientX, e.clientY);
      if (hits.length > 0) {
        const top = hits[0].object as THREE.Mesh;
        const cid = top.userData.componentId as ArduinoComponentId;
        if (cid) {
          onSelectRef.current(cid);
        }
      }
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('click', onClick);

    // Orbit Controls
    let isDragging = false;
    let previousPos = { x: 0, y: 0 };
    let isUserInteracting = false;
    let idleTimer: number | null = null;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      isUserInteracting = true;
      if (idleTimer) window.clearTimeout(idleTimer);
      previousPos = { x: e.clientX, y: e.clientY };
      container.style.cursor = 'grabbing';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - previousPos.x;
      const dy = e.clientY - previousPos.y;

      targetSphericalRef.current.theta -= dx * 0.007;
      targetSphericalRef.current.phi -= dy * 0.007;
      targetSphericalRef.current.phi = Math.max(0.15, Math.min(Math.PI / 2 - 0.04, targetSphericalRef.current.phi));

      previousPos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
      container.style.cursor = 'grab';
      idleTimer = window.setTimeout(() => {
        isUserInteracting = false;
      }, 4000);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetSphericalRef.current.radius += e.deltaY * 0.006;
      targetSphericalRef.current.radius = Math.max(4.0, Math.min(16.0, targetSphericalRef.current.radius));
    };

    // Touch Support
    let touchDist = 0;
    const onTouchStart = (e: TouchEvent) => {
      isUserInteracting = true;
      if (e.touches.length === 1) {
        isDragging = true;
        previousPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        touchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging) {
        const dx = e.touches[0].clientX - previousPos.x;
        const dy = e.touches[0].clientY - previousPos.y;
        targetSphericalRef.current.theta -= dx * 0.008;
        targetSphericalRef.current.phi -= dy * 0.008;
        targetSphericalRef.current.phi = Math.max(0.15, Math.min(Math.PI / 2 - 0.04, targetSphericalRef.current.phi));
        previousPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = (touchDist - dist) * 0.01;
        targetSphericalRef.current.radius = Math.max(4.0, Math.min(16.0, targetSphericalRef.current.radius + factor));
        touchDist = dist;
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
      idleTimer = window.setTimeout(() => {
        isUserInteracting = false;
      }, 4000);
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd);

    // Animation Loop
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Auto-rotation when idle
      if (autoRotate && !isDragging && !isUserInteracting) {
        targetSphericalRef.current.theta += 0.003;
      }

      // Smooth spherical interpolation
      sphericalRef.current.theta += (targetSphericalRef.current.theta - sphericalRef.current.theta) * 0.08;
      sphericalRef.current.phi += (targetSphericalRef.current.phi - sphericalRef.current.phi) * 0.08;
      sphericalRef.current.radius += (targetSphericalRef.current.radius - sphericalRef.current.radius) * 0.08;

      const offset = new THREE.Vector3().setFromSpherical(sphericalRef.current);
      camera.position.copy(cameraTargetRef.current).add(offset);
      camera.lookAt(cameraTargetRef.current);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      if (idleTimer) clearTimeout(idleTimer);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('click', onClick);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);

      if (renderer.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [autoRotate]);

  // Reactive Pin 13 LED (L)
  useEffect(() => {
    if (nodesRef.current) {
      const { ledLMaterial, ledLLight } = nodesRef.current;
      if (isLedLActive) {
        ledLMaterial.color.set('#fbbf24');
        ledLMaterial.emissive.set('#f59e0b');
        ledLMaterial.emissiveIntensity = 2.4;
        ledLLight.intensity = 2.8;
      } else {
        ledLMaterial.color.set('#332200');
        ledLMaterial.emissive.set('#000000');
        ledLMaterial.emissiveIntensity = 0.0;
        ledLLight.intensity = 0.0;
      }
    }
  }, [isLedLActive]);

  // Reactive Reset Sequence (TX/RX blink)
  useEffect(() => {
    if (!isResetting || !nodesRef.current) return;
    const { ledTxMaterial, ledRxMaterial } = nodesRef.current;

    let count = 0;
    const blinkInterval = setInterval(() => {
      const state = count % 2 === 0;
      ledTxMaterial.emissive.set(state ? '#fbbf24' : '#000000');
      ledTxMaterial.emissiveIntensity = state ? 2.0 : 0.0;

      ledRxMaterial.emissive.set(!state ? '#fbbf24' : '#000000');
      ledRxMaterial.emissiveIntensity = !state ? 2.0 : 0.0;

      count++;
      if (count > 8) {
        clearInterval(blinkInterval);
        ledTxMaterial.emissive.set('#000000');
        ledTxMaterial.emissiveIntensity = 0.0;
        ledRxMaterial.emissive.set('#000000');
        ledRxMaterial.emissiveIntensity = 0.0;
      }
    }, 90);

    return () => clearInterval(blinkInterval);
  }, [isResetting]);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-full min-h-[480px] lg:min-h-[560px] overflow-hidden select-none cursor-grab active:cursor-grabbing"
    />
  );
}
