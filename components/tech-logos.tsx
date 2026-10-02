'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export function PythonLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.91 2C6.9 2 7.21 4.17 7.21 4.17L7.22 6.42H12.02V7.15H5.25S2 6.78 2 11.83C2 16.88 4.84 16.63 4.84 16.63H6.53V14.25S6.44 11.41 9.32 11.41H14.15S16.89 11.51 16.89 8.84V4.34S17.25 2 11.91 2ZM9.39 3.51C9.88 3.51 10.28 3.91 10.28 4.4C10.28 4.89 9.88 5.29 9.39 5.29C8.9 5.29 8.5 4.89 8.5 4.4C8.5 3.91 8.9 3.51 9.39 3.51Z"
        fill="currentColor"
      />
      <path
        d="M12.09 22C17.1 22 16.79 19.83 16.79 19.83L16.78 17.58H11.98V16.85H18.75S22 17.22 22 12.17C22 7.12 19.16 7.37 19.16 7.37H17.47V9.75S17.56 12.59 14.68 12.59H9.85S7.11 12.49 7.11 15.16V19.66S6.75 22 12.09 22ZM14.61 20.49C14.12 20.49 13.72 20.09 13.72 19.6C13.72 19.11 14.12 18.71 14.61 18.71C15.1 18.71 15.5 19.11 15.5 19.6C15.5 20.09 15.1 20.49 14.61 20.49Z"
        fill="currentColor"
        opacity="0.8"
      />
    </svg>
  );
}

export function CppLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 8.5C9.5 8.5 8 10 8 12C8 14 9.5 15.5 11.5 15.5C12.5 15.5 13.3 15 13.8 14.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M15 12H17M16 11V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18.5 12H20.5M19.5 11V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function TypeScriptLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 10H12M9 10V18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M14 16.5C14.5 17.5 15.5 18 16.8 18C18.2 18 19 17.2 19 16.2C19 14.2 14.2 14.8 14.2 12.2C14.2 10.8 15.4 10 16.8 10C17.8 10 18.7 10.5 19 11.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PyTorchLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.5 2.5L12 4L13.8 5.8C16.8 7.3 18.5 10.5 18 14C17.3 18.2 13.4 21 9.2 20.2C5.5 19.5 2.8 16.2 3 12.4C3.2 9 5.4 6.2 8.6 5.2L8.5 2.8C4.1 4 1 8 1 12.7C1 18.4 5.6 23 11.3 23C17 23 21.6 18.4 21.6 12.7C21.6 8 18.4 4 14 2.8L13.5 2.5Z"
        fill="currentColor"
      />
      <circle cx="15.5" cy="5" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function OpenCVLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="6.5" cy="16.5" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="16.5" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="7" r="1.5" fill="currentColor" />
      <circle cx="6.5" cy="16.5" r="1.5" fill="currentColor" />
      <circle cx="17.5" cy="16.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function ESP32Logo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="8" y="8" width="8" height="8" rx="1" fill="currentColor" opacity="0.3" />
      <path d="M2 9H5M2 12H5M2 15H5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M19 9H22M19 12H22M19 15H22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M9 2V5M12 2V5M15 2V5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M9 19V22M12 19V22M15 19V22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function RaspberryPiLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="13.5" r="2.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8.5" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="15.5" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="9.5" cy="16.5" r="2.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="14.5" cy="16.5" r="2.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="19.5" r="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 6C9 4 10 2 12 3C14 2 15 4 14 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 3V6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function ReactLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
    </svg>
  );
}

export function NextJsLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 8V16L17 8V16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TailwindLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 12C7 9.5 9 8.5 11 9.5C10 11.5 11 12.5 12 14C11 15.5 10 16 9 15C8 14 7 13.5 6 12ZM12 7C13 4.5 15 3.5 17 4.5C16 6.5 17 7.5 18 9C17 10.5 16 11 15 10C14 9 13 8.5 12 7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LinuxLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C9.5 2 8 4 8 7C8 9 7.5 10 6 12C4.5 14 5 17 6 18C7 19 8 20 12 20C16 20 17 19 18 18C19 17 19.5 14 18 12C16.5 10 16 9 16 7C16 4 14.5 2 12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="10.5" cy="6.5" r="0.8" fill="currentColor" />
      <circle cx="13.5" cy="6.5" r="0.8" fill="currentColor" />
      <path d="M11 9H13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function GitLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="3" transform="rotate(45 12 12)" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="12" r="1.5" fill="currentColor" />
      <circle cx="16" cy="8" r="1.5" fill="currentColor" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
      <path d="M8 12H12M12 12V8H14.5M12 12V16H14.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function DockerLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="7" y="10" width="2" height="2" stroke="currentColor" strokeWidth="1.2" />
      <rect x="10" y="10" width="2" height="2" stroke="currentColor" strokeWidth="1.2" />
      <rect x="13" y="10" width="2" height="2" stroke="currentColor" strokeWidth="1.2" />
      <rect x="10" y="7" width="2" height="2" stroke="currentColor" strokeWidth="1.2" />
      <rect x="13" y="7" width="2" height="2" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M3 13C3.5 13 4 14 5 14C6 14 7 13 8 13C9 13 10 14 11 14C12 14 13 13 14 13C15 13 16 14 17 14C18 14 19 13 20 13C21 13 21.5 13.5 22 14.5C21 18 18 20 12 20C6 20 3.5 17 3 13Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function HuggingFaceLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="10" r="1.2" fill="currentColor" />
      <circle cx="15" cy="10" r="1.2" fill="currentColor" />
      <path d="M8.5 14.5C9.5 16 14.5 16 15.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 11C4 12 4 14 5 15M19 11C20 12 20 14 19 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function NodeLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 6L17.5 9V15L12 18L6.5 15V9L12 6Z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function SensorBusLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 7.5L10 15M15.5 7.5L14 15M9 6H15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
