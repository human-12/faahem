'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createESP32Model, ESP32ModelNodes } from './ESP32Model';
import { ESP32ComponentId } from './ESP32Types';

interface ESP32SceneProps {
  onSelectComponent: (id: ESP32ComponentId) => void;
  onHoverComponent: (id: ESP32ComponentId | null) => void;
  isLedActive: boolean;
  isSensorConnected: boolean;
  isDigitalTwinSynced: boolean;
  focusTarget: 'board' | 'chip' | 'gpio' | 'camera' | 'sensor';
}

export function ESP32Scene({
  onSelectComponent,
  onHoverComponent,
  isLedActive,
  isSensorConnected,
  focusTarget,
}: ESP32SceneProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const nodesRef = useRef<ESP32ModelNodes | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const sensorWireRef = useRef<THREE.Line | null>(null);

  // Focus targets & camera animation
  const cameraTargetRef = useRef(new THREE.Vector3(0, 0, 0));

  // Stabilize callbacks in refs to avoid useEffect re-instantiations
  const onSelectRef = useRef(onSelectComponent);
  const onHoverRef = useRef(onHoverComponent);
  useEffect(() => {
    onSelectRef.current = onSelectComponent;
    onHoverRef.current = onHoverComponent;
  });

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#070707');
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(4.5, 5.0, 5.5);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Tabletop & Grid
    const tableGeo = new THREE.PlaneGeometry(35, 35);
    const tableMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#090908'),
      roughness: 0.85,
      metalness: 0.1,
    });
    const tableMesh = new THREE.Mesh(tableGeo, tableMat);
    tableMesh.rotation.x = -Math.PI / 2;
    tableMesh.position.y = -0.55;
    tableMesh.receiveShadow = true;
    scene.add(tableMesh);

    const gridHelper = new THREE.GridHelper(24, 48, '#262622', '#141412');
    gridHelper.position.y = -0.54;
    scene.add(gridHelper);

    // Lights
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight('#ffffff', 2.2);
    keyLight.position.set(6, 10, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#38bdf8', 1.4);
    rimLight.position.set(-8, 6, -6);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight('#E1E0CC', 1.0, 15);
    accentLight.position.set(0, 4, 3);
    scene.add(accentLight);

    // ESP32 Board
    const esp32Nodes = createESP32Model();
    nodesRef.current = esp32Nodes;
    scene.add(esp32Nodes.group);

    // Camera Module (OV2640)
    const camGroup = new THREE.Group();
    camGroup.position.set(-3.8, -0.4, 1.8);
    camGroup.rotation.y = 0.4;

    const camPcb = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.08, 1.2),
      new THREE.MeshStandardMaterial({ color: '#162217', roughness: 0.6 })
    );
    camPcb.castShadow = true;
    camGroup.add(camPcb);

    const lensBarrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.35, 0.4, 24),
      new THREE.MeshStandardMaterial({ color: '#1e1e1e', roughness: 0.3, metalness: 0.8 })
    );
    lensBarrel.position.set(0, 0.22, 0);
    camGroup.add(lensBarrel);

    const lensGlass = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.25, 0.05, 24),
      new THREE.MeshStandardMaterial({ color: '#38bdf8', roughness: 0.1, metalness: 0.9 })
    );
    lensGlass.position.set(0, 0.41, 0);
    camGroup.add(lensGlass);

    camPcb.userData = { componentId: 'camera_module' as ESP32ComponentId };
    esp32Nodes.interactiveMeshes.push(camPcb);
    scene.add(camGroup);

    // Ribbon Cable
    const ribbonCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-3.2, -0.38, 1.8),
      new THREE.Vector3(-2.6, -0.4, 0.9),
      new THREE.Vector3(-1.8, -0.3, 0.6)
    );
    const ribbonGeo = new THREE.TubeGeometry(ribbonCurve, 20, 0.08, 8, false);
    const ribbonMat = new THREE.MeshStandardMaterial({ color: '#cf9922', roughness: 0.4, metalness: 0.6 });
    const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
    scene.add(ribbonMesh);

    // Temperature Sensor Breakout
    const sensorGroup = new THREE.Group();
    sensorGroup.position.set(3.8, -0.42, 1.6);
    sensorGroup.rotation.y = -0.3;

    const sensorPcb = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.06, 0.9),
      new THREE.MeshStandardMaterial({ color: '#4a287a', roughness: 0.6 })
    );
    sensorPcb.castShadow = true;
    sensorGroup.add(sensorPcb);

    const sensorCan = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.12, 0.28),
      new THREE.MeshStandardMaterial({ color: '#e5e7eb', metalness: 0.9, roughness: 0.2 })
    );
    sensorCan.position.set(0, 0.08, 0);
    sensorGroup.add(sensorCan);

    sensorPcb.userData = { componentId: 'temp_sensor' as ESP32ComponentId };
    esp32Nodes.interactiveMeshes.push(sensorPcb);
    scene.add(sensorGroup);

    // Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getRaycastIntersects = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      return raycaster.intersectObjects(esp32Nodes.interactiveMeshes, true);
    };

    let hoveredMesh: THREE.Mesh | null = null;

    const onPointerMove = (e: PointerEvent) => {
      const intersects = getRaycastIntersects(e.clientX, e.clientY);
      if (intersects.length > 0) {
        const topHit = intersects[0].object as THREE.Mesh;
        if (topHit !== hoveredMesh) {
          hoveredMesh = topHit;
          const compId = topHit.userData.componentId as ESP32ComponentId;
          onHoverRef.current(compId || null);
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
      const intersects = getRaycastIntersects(e.clientX, e.clientY);
      if (intersects.length > 0) {
        const topHit = intersects[0].object as THREE.Mesh;
        const compId = topHit.userData.componentId as ESP32ComponentId;
        if (compId) {
          onSelectRef.current(compId);
        }
      }
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('click', onClick);

    // Orbit Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const spherical = new THREE.Spherical(7.5, Math.PI / 3.4, Math.PI / 4);
    const targetSpherical = new THREE.Spherical(7.5, Math.PI / 3.4, Math.PI / 4);
    let autoRotate = true;
    let autoRotateTimer: number | null = null;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      autoRotate = false;
      if (autoRotateTimer) window.clearTimeout(autoRotateTimer);
      previousMousePosition = { x: e.clientX, y: e.clientY };
      container.style.cursor = 'grabbing';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      targetSpherical.theta -= deltaX * 0.007;
      targetSpherical.phi -= deltaY * 0.007;
      targetSpherical.phi = Math.max(0.2, Math.min(Math.PI / 2 - 0.05, targetSpherical.phi));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
      container.style.cursor = 'grab';
      autoRotateTimer = window.setTimeout(() => {
        autoRotate = true;
      }, 4000);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetSpherical.radius += e.deltaY * 0.006;
      targetSpherical.radius = Math.max(3.2, Math.min(13.0, targetSpherical.radius));
    };

    let touchStartDist = 0;
    const onTouchStart = (e: TouchEvent) => {
      autoRotate = false;
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;
        targetSpherical.theta -= deltaX * 0.008;
        targetSpherical.phi -= deltaY * 0.008;
        targetSpherical.phi = Math.max(0.2, Math.min(Math.PI / 2 - 0.05, targetSpherical.phi));
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = (touchStartDist - dist) * 0.01;
        targetSpherical.radius = Math.max(3.2, Math.min(13.0, targetSpherical.radius + factor));
        touchStartDist = dist;
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
      autoRotateTimer = window.setTimeout(() => {
        autoRotate = true;
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

      if (autoRotate && !isDragging) {
        targetSpherical.theta += 0.0025;
      }

      spherical.theta += (targetSpherical.theta - spherical.theta) * 0.08;
      spherical.phi += (targetSpherical.phi - spherical.phi) * 0.08;
      spherical.radius += (targetSpherical.radius - spherical.radius) * 0.08;

      const offset = new THREE.Vector3().setFromSpherical(spherical);
      camera.position.copy(cameraTargetRef.current).add(offset);
      camera.lookAt(cameraTargetRef.current);

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      if (autoRotateTimer) clearTimeout(autoRotateTimer);
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
  }, []);

  // Update Sensor Wire dynamically
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    if (sensorWireRef.current) {
      scene.remove(sensorWireRef.current);
      sensorWireRef.current.geometry.dispose();
    }

    const p1 = new THREE.Vector3(3.4, -0.4, 1.6);
    const p2 = isSensorConnected
      ? new THREE.Vector3(1.2, 0.1, -1.14) // GPIO 1/2 pin
      : new THREE.Vector3(2.5, -0.48, 1.1); // Resting wire

    const wireCurve = new THREE.QuadraticBezierCurve3(
      p1,
      new THREE.Vector3((p1.x + p2.x) / 2, isSensorConnected ? 0.3 : -0.45, (p1.z + p2.z) / 2),
      p2
    );

    const points = wireCurve.getPoints(24);
    const wireGeo = new THREE.BufferGeometry().setFromPoints(points);
    const wireMat = new THREE.LineBasicMaterial({
      color: isSensorConnected ? '#34d399' : '#8e8d80',
      linewidth: 2,
    });

    const wire = new THREE.Line(wireGeo, wireMat);
    sensorWireRef.current = wire;
    scene.add(wire);
  }, [isSensorConnected]);

  // Update LED state dynamically
  useEffect(() => {
    if (nodesRef.current) {
      const { ledGPIO4Material, ledGPIO4Light } = nodesRef.current;
      if (isLedActive) {
        ledGPIO4Material.color.set('#38bdf8');
        ledGPIO4Material.emissive.set('#38bdf8');
        ledGPIO4Material.emissiveIntensity = 2.2;
        ledGPIO4Light.intensity = 2.8;
      } else {
        ledGPIO4Material.color.set('#1e293b');
        ledGPIO4Material.emissive.set('#000000');
        ledGPIO4Material.emissiveIntensity = 0;
        ledGPIO4Light.intensity = 0;
      }
    }
  }, [isLedActive]);

  // Adjust camera focus target smoothly based on user actions
  useEffect(() => {
    if (focusTarget === 'chip') {
      cameraTargetRef.current.set(-1.1, 0.2, 0);
    } else if (focusTarget === 'gpio') {
      cameraTargetRef.current.set(0, 0, 1.0);
    } else if (focusTarget === 'camera') {
      cameraTargetRef.current.set(-3.5, 0, 1.5);
    } else if (focusTarget === 'sensor') {
      cameraTargetRef.current.set(3.5, 0, 1.4);
    } else {
      cameraTargetRef.current.set(0, 0, 0);
    }
  }, [focusTarget]);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-full min-h-[500px] overflow-hidden select-none cursor-grab active:cursor-grabbing"
    />
  );
}
