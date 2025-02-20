// Sequence: [sound, display text, time in ms]
const sequence = [
    ["kick", "l3", 0],        // Start with a strong beat
    ["hihat", "l1", 200],
    ["tom1", "l4", 500],         // Followed by Tom 1
    ["tom2", "l5", 800],         // Add Tom 2
    ["hihat", "l1", 1000],
    ["crash", "l6", 1300],  // Crash for emphasis
    ["kick", "l3", 1600],    // Kick Drum again
    ["snare", "l2", 1800],        // Snare for rhythm
    ["hihat", "l1", 2100],       // Quick Hi-Hat tap
    ["ride", "l7", 2600],  // End with the Ride Cymbal
];

  
  
  document.addEventListener('DOMContentLoaded', () => {
    const drums = document.querySelectorAll('.drum');
    const stick1 = document.getElementById('stick1'); // Stick image
    const stick2 = document.getElementById('stick2'); // Stick image
    const drumKit = document.querySelector('.drum-kit'); // Drum kit container
  
    // Initial positions for the sticks
    stick1.style.top = '10%';
    stick1.style.left = '35%';
    stick2.style.top = '10%';
    stick2.style.left = '47%';
    drums.forEach((drum) => {
      drum.addEventListener('click', () => handleHit(drum));
    });
  
    document.addEventListener('keydown', (event) => {
      const drum = document.querySelector(`.drum[data-key="${event.key}"]`);
      if (drum) handleHit(drum);
    });
  
    function handleHit(drum) {
      playSound(drum);
  
      const drumKey = drum.getAttribute('data-key');
      const rect = drum.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
  
      if (['d', 'f', 'h', 'g', 'j', 's'].includes(drumKey)) {
        const stick = drumKey === 'd' || drumKey === 's' || drumKey === 'h' ? stick1 : stick2;
        animateStick(stick, centerX, centerY, getStickRotation(drumKey));
      } else if (drumKey === 'a') {
        // Kick drum special effect
        drum.classList.add('active');
        setTimeout(() => drum.classList.remove('active'), 200);
      }
    }
  
    function animateStick(stick, targetX, targetY, rotationAngle) {
      const drumKitRect = drumKit.getBoundingClientRect();
  
      // Calculate relative position within drum kit
      const relativeX = ((targetX - 30 - drumKitRect.left) / drumKitRect.width) * 100;
      const relativeY = ((targetY - drumKitRect.top) / drumKitRect.height) * 100;
  
      stick.style.transition = 'all 0.2s ease';
      stick.style.transform = `rotate(${rotationAngle}deg)`;
      stick.style.top = `${relativeY}%`;
      stick.style.left = `${relativeX}%`;
  
      // Reset stick position after animation
      setTimeout(() => {
        stick.style.transition = 'all 0.2s ease';
        stick.style.transform = 'rotate(0deg)';
        stick.style.top = '10%';
        stick.style.left = stick === stick1 ? '35%' : '47%';
      }, 200);
    }
    function getStickRotation(drumKey) {
      switch (drumKey) {
        case 'd': return -40; // Hi-Hat
        case 'f': return -30; // Tom 1
        case 'h': return -50; // Crash
        case 'g': return 30; // Tom 2
        case 'j': return 40; // Ride
        case 's': return -40; // Snare
        default: return 0; // Default
      }
    }
  
    function playSound(drum) {
      const sound = drum.getAttribute('data-sound');
      const audio = new Audio(`sounds/${sound}.mp3`);
      audio.play();
    };
  
  });
  
