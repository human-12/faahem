// Autonomous High-Fidelity Hip-Hop & Rap Beat Synthesizer Engine
// Built entirely with browser Web Audio API: 100% reliable, zero external bandwidth, infinite seamless loop.

export interface BeatTrack {
  id: string;
  name: string;
  bpm: number;
  genre: string;
}

export const BEAT_TRACKS: BeatTrack[] = [
  { id: '808-cypher', name: 'CYPHER 808 // DARK DRIFT', bpm: 88, genre: 'Modern 808 Trap' },
  { id: 'boom-bap', name: 'FAST CYPHER // BOOM BAP 94', bpm: 94, genre: 'Vintage East-Coast Boom Bap' },
  { id: 'cloud-rap', name: 'NIGHT RUNNER // CLOUD RAP', bpm: 136, genre: 'Atmospheric Cloud Rap' },
];

export class RapBeatEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentTrackIdx = 0;
  private volume = 0.65;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private distortion: WaveShaperNode | null = null;

  // Scheduling clock
  private nextNoteTime = 0;
  private currentStep = 0;
  private timerId: number | null = null;
  private isMuted = false;

  private onStepListeners: ((step: number) => void)[] = [];

  constructor() {
    // Initialized on user interaction
  }

  private initAudio() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 64;

        // Soft saturation wave shaper for warm analog glue
        this.distortion = this.ctx.createWaveShaper();
        this.distortion.curve = this.makeDistortionCurve(20);
        this.distortion.oversample = '2x';

        this.masterGain.connect(this.distortion);
        this.distortion.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  private makeDistortionCurve(amount: number) {
    const k = amount;
    const nSamples = 44100;
    const curve = new Float32Array(nSamples);
    const deg = Math.PI / 180;
    for (let i = 0; i < nSamples; ++i) {
      const x = (i * 2) / nSamples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  public addStepListener(fn: (step: number) => void) {
    this.onStepListeners.push(fn);
  }

  public removeStepListener(fn: (step: number) => void) {
    this.onStepListeners = this.onStepListeners.filter((l) => l !== fn);
  }

  public start() {
    this.initAudio();
    if (!this.ctx || this.isPlaying) return;

    this.isPlaying = true;
    this.currentStep = 0;
    this.nextNoteTime = this.ctx.currentTime + 0.05;

    this.scheduleLoop();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    this.setVolume(this.volume);
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public nextTrack(): BeatTrack {
    this.currentTrackIdx = (this.currentTrackIdx + 1) % BEAT_TRACKS.length;
    return BEAT_TRACKS[this.currentTrackIdx];
  }

  public getCurrentTrack(): BeatTrack {
    return BEAT_TRACKS[this.currentTrackIdx];
  }

  public getByteFrequencyData(): Uint8Array<ArrayBuffer> {
    if (!this.analyser) return new Uint8Array(16) as Uint8Array<ArrayBuffer>;
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data as Uint8Array<ArrayBuffer>;
  }

  // Lookahead Scheduler
  private scheduleLoop = () => {
    if (!this.isPlaying || !this.ctx) return;

    const bpm = BEAT_TRACKS[this.currentTrackIdx].bpm;
    const stepDuration = 60 / bpm / 4; // 16th notes
    const lookaheadTime = 0.12; // 120ms schedule window

    while (this.nextNoteTime < this.ctx.currentTime + lookaheadTime) {
      this.playStep(this.currentStep, this.nextNoteTime);
      this.currentStep = (this.currentStep + 1) % 32; // 2-bar 32-step loop
      this.nextNoteTime += stepDuration;
    }

    this.timerId = window.setTimeout(this.scheduleLoop, 35);
  };

  private playStep(step: number, time: number) {
    if (!this.ctx || !this.masterGain) return;

    const trackId = BEAT_TRACKS[this.currentTrackIdx].id;

    // Trigger visualizer listener safely
    this.onStepListeners.forEach((l) => l(step));

    if (trackId === '808-cypher') {
      this.play808CypherStep(step, time);
    } else if (trackId === 'boom-bap') {
      this.playBoomBapStep(step, time);
    } else {
      this.playCloudRapStep(step, time);
    }
  }

  // =========================================================================
  // BEAT PATTERN 1: CYPHER 808 // DARK DRIFT (Punchy Sub Drops, Trap Hats, Dark Minor Keys)
  // =========================================================================
  private play808CypherStep(step: number, time: number) {
    // 808 Kick / Sub Bass: Steps 0, 6, 10, 16, 22, 26
    const kickSteps = [0, 6, 10, 16, 22, 26];
    if (kickSteps.includes(step)) {
      const pitch = step >= 16 ? 41.2 : 46.25; // E1 / F#1 low sub notes
      this.trigger808Bass(time, pitch, 0.45);
    }

    // Snare / Clap: Heavy on 4, 12, 20, 28 (Quarter notes beats 2 & 4)
    if (step % 8 === 4) {
      this.triggerSnare(time, 0.36);
    }

    // Rolling Trap Hi-Hats on every even step, with 32nd note rolls on 14 & 30
    if (step % 2 === 0) {
      this.triggerHiHat(time, step % 4 === 0 ? 0.22 : 0.13, false);
    }
    if (step === 14 || step === 15 || step === 30 || step === 31) {
      this.triggerHiHat(time + 0.04, 0.16, true);
    }

    // Atmospheric Minor Synth Pad: Triggers every 8 steps
    if (step === 0 || step === 16) {
      const rootFreq = step === 0 ? 174.61 : 164.81; // F3 / E3 dark minor pad
      this.triggerRhodesChord(time, rootFreq, 1.25);
    }
  }

  // =========================================================================
  // BEAT PATTERN 2: BOOM BAP 94 (Dusty Vinyl Kick, Cracking Snare, Jazz Rhodes)
  // =========================================================================
  private playBoomBapStep(step: number, time: number) {
    // Boom Bap Kick: Steps 0, 3, 10, 16, 19, 26, 28
    const kickSteps = [0, 3, 10, 16, 19, 26, 28];
    if (kickSteps.includes(step)) {
      this.triggerAcousticKick(time, 0.4);
    }

    // Crispy Snare on 4, 12, 20, 28
    if (step % 8 === 4) {
      this.triggerBoomBapSnare(time, 0.38);
    }

    // Swing hi-hat on every 8th note with slight velocity groove
    if (step % 2 === 0) {
      const vel = step % 4 === 0 ? 0.22 : 0.14;
      this.triggerHiHat(time, vel, false);
    }

    // Jazz minor 9th chords on bar downbeats
    if (step === 0 || step === 16) {
      const chordRoot = step === 0 ? 220 : 196; // A3 / G3
      this.triggerRhodesChord(time, chordRoot, 1.4);
    }
  }

  // =========================================================================
  // BEAT PATTERN 3: CLOUD RAP (136 BPM Half-Time, Reverberant Sub, Airy Pluck)
  // =========================================================================
  private playCloudRapStep(step: number, time: number) {
    // Half-time kick
    if (step === 0 || step === 12 || step === 16 || step === 28) {
      this.trigger808Bass(time, 43.65, 0.55);
    }

    // Snare on 8 and 24 (Half-time backbeat)
    if (step === 8 || step === 24) {
      this.triggerSnare(time, 0.4);
    }

    // Airy hi-hats
    if (step % 2 === 0) {
      this.triggerHiHat(time, 0.16, false);
    }

    // Melodic Arp Pluck on steps 0, 4, 6, 10, 16, 20, 22, 26
    const pluckSteps = [0, 4, 6, 10, 16, 20, 22, 26];
    if (pluckSteps.includes(step)) {
      const notes = [440, 523.25, 659.25, 783.99]; // A4, C5, E5, G5
      const note = notes[(step / 2) % notes.length];
      this.triggerPluck(time, note, 0.18);
    }
  }

  // =========================================================================
  // SYNTHESIZER SOUND GENERATORS
  // =========================================================================

  // 1. Deep 808 Sub-Bass
  private trigger808Bass(time: number, freq: number, gainVal: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Punchy pitch drop at transient
    osc.frequency.setValueAtTime(freq * 2.8, time);
    osc.frequency.exponentialRampToValueAtTime(freq, time + 0.05);

    gain.gain.setValueAtTime(gainVal, time);
    gain.gain.exponentialRampToValueAtTime(gainVal * 0.7, time + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.5);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.52);
  }

  // 2. Punchy Acoustic / Boom Bap Kick
  private triggerAcousticKick(time: number, gainVal: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(45, time + 0.08);

    gain.gain.setValueAtTime(gainVal, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.23);
  }

  // 3. Crisp Trap Snare
  private triggerSnare(time: number, gainVal: number) {
    if (!this.ctx || !this.masterGain) return;

    // Noise component
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1200, time);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(gainVal, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    // Body tone
    const osc = this.ctx.createOscillator();
    const toneGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, time);
    osc.frequency.exponentialRampToValueAtTime(90, time + 0.08);

    toneGain.gain.setValueAtTime(gainVal * 0.6, time);
    toneGain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    osc.connect(toneGain);
    toneGain.connect(this.masterGain);

    whiteNoise.start(time);
    whiteNoise.stop(time + 0.19);
    osc.start(time);
    osc.stop(time + 0.13);
  }

  // 4. Boom Bap Snap Snare
  private triggerBoomBapSnare(time: number, gainVal: number) {
    this.triggerSnare(time, gainVal * 1.1);
  }

  // 5. Trap Hi-Hat
  private triggerHiHat(time: number, gainVal: number, isRoll = false) {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * (isRoll ? 0.03 : 0.05);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7500, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(gainVal, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + (isRoll ? 0.035 : 0.055));

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
    noise.stop(time + 0.06);
  }

  // 6. Atmospheric Rhodes/Synth Minor Chord
  private triggerRhodesChord(time: number, rootFreq: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    // Minor 7th chord interval ratios: 1, 1.2 (m3), 1.5 (5th), 1.8 (m7)
    const intervals = [1, 1.2, 1.5, 1.8];

    intervals.forEach((ratio) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(rootFreq * ratio, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, time);
      filter.frequency.linearRampToValueAtTime(750, time + 0.15);
      filter.frequency.exponentialRampToValueAtTime(320, time + duration);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.06, time + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(time);
      osc.stop(time + duration + 0.05);
    });
  }

  // 7. Melodic Pluck
  private triggerPluck(time: number, freq: number, gainVal: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, time);

    gain.gain.setValueAtTime(gainVal, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.28);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.3);
  }
}

export const rapBeatEngine = new RapBeatEngine();
