/* style.css — fully integrated and optimized */

/* Reset and Base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  max-width: 100%;
  overflow-x: hidden;
}

body {
  font-family: 'Baloo 2', cursive;
  background-color: #fff5f7;
  color: #5b3a2f;
  text-align: center;
  padding: 0.5rem 0;
}

h1 {
  font-size: 2rem;
  color: #d86f72;
}

p {
  font-size: 1.2rem;
  color: #7a4c46;
  margin: 0.1rem 0 .5rem;
}

/* Logo */
.logo-header {
  text-align: center;
  margin: 0;
}

.donut-logo {
  max-width: 250px;
  height: auto;
  display: block;
  margin: 0.5rem auto;
}

/* Burger Menu */
.burger-button {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
}

.side-menu {
  position: fixed;
  top: 0;
  left: -250px;
  width: 200px;
  height: 100%;
  background-color: #fff5f7;
  color: #5b3a2f;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  padding: 2rem 1rem;
  z-index: 1000;
  transition: left 0.3s ease;
}

.side-menu.open {
  left: 0;
}

.side-menu ul {
  list-style: none;
  padding: 0;
}

.side-menu li {
  margin-bottom: 1.2rem;
}

.side-menu a {
  text-decoration: none;
  color: #5b3a2f;
  font-weight: bold;
}

/* Splide Carousel */
.splide {
  max-width: 700px;
  margin: 0 auto 0rem;
  padding: 0rem 0;
}

.splide__pagination {
  display: none;
}

.splide__slide {
  display: flex;
  justify-content: center;
  align-items: center;
  padding:0 0 0.5rem 0;
}

/* Donut Buttons and Images */
.donut,
.donut-image {
  width: 100%;
  max-width: 120px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: 4px solid #ffcfd2;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin: 0 auto;
  transition: transform 0.2s ease;
  object-fit: cover;
}

.donut:hover,
.donut-image:hover {
  transform: scale(1.05);
  background-color: #ffe7eb;
  border-color: #f4a8aa;
}

.donut span {
  font-size: 2rem;
  margin-bottom: 0.25rem;
}

.donut div {
  font-weight: bold;
  font-size: 1rem;
}

/* Donut Selection Text */
#donut-selection-wrapper {
  min-height: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 0rem;
}

.donut-selection {
  margin-top: 0rem;
  font-size: 1.3rem;
  color: #5b3a2f;
  min-height: 1.6em;
}

/* Add Button */
.add-button {
  margin-top: 0;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  background-color: #ffcfd2;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: inline-block;
  white-space: nowrap;
}

.add-button:hover {
  background-color: #f4a8aa;
}

/* Calendar History */
#calendar-history {
  background: #fffafc;
  border: 2px dashed #ffcfd2;
  padding: 1rem;
  border-radius: 10px;
  max-width: 500px;
  margin: 1rem auto;
  color: #5b3a2f;
}

/* Mood Dozen */
.mood-dozen-animation-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  overflow: hidden;
  max-width: 100%;
  min-height: 240px;
}

.mood-dozen-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 320px;
  width: 100%;
}


.mood-dozen-box {
  display: grid;
  grid-template-columns: repeat(3, 75px);
  grid-template-rows: repeat(2, 75px);
  gap: 0.25rem;
  width: 100%;
  margin: 0.1rem auto;
  padding: 2rem 1rem 3rem 2.5rem; /* desktop defaults */
  background-image: url('images/box.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 240px;
  max-width: 320px;
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s ease;
  backface-visibility: hidden;
  will-change: transform, opacity;
  transform: translateZ(0);
}


.mood-dozen-box.enter-from-bottom {
  animation: enterFromBottom 0.6s ease-out forwards;
}

.mood-dozen-box.pop-open {
  animation: popOpen 0.4s ease-out forwards;
}


.donut-slot {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.donut-slot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  background-color: transparent;
}

.mood-box-name {
  position: absolute;              /* 👈 absolute positioning removes layout footprint */
  bottom: 1.5rem;             /* 👈 stick to bottom edge of the box */
  left: 50%;                       /* 👈 center horizontally */
  transform: translateX(-50%);     /* 👈 true centering */
  font-size: 1.2rem;
  color: #7a4c46;
  z-index: 15;
  background-color: transparent;
  padding: 0 0rem;
  display: inline-block;
  border-radius: 6px;
  white-space: nowrap;
}

/* Animations */
@keyframes dropLid {
  0% {
    transform: translateY(-100%);
  }
  80% {
    transform: translateY(5%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes zipAway {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(120vw);
    opacity: 0;
  }
}

@keyframes enterFromBottom {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  60% {
    transform: translateX(10%);
    opacity: 1;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes popOpen {
  0% { transform: scale(0.95); }
  60% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.mood-dozen-animation-wrapper.slide-out {
  animation: zipAway 1s ease-in forwards;
  will-change: transform, opacity;
  transform-origin: left center;
}

/* Lid */
.box-lid {
  position: absolute;
  top:-1.3rem;
  left: 0;
  padding: 2rem 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease, opacity 0.8s ease;
  opacity: 0;
  pointer-events: none;
  z-index: 10;
  transform: translateY(-100%);
  visibility: hidden;

}

.box-lid.visible {
  opacity: 1;
  visibility: visible;
  animation: dropLid 1s ease-out forwards;
}

.box-lid.reset {
  opacity: 0 !important;
  transform: translateY(-100%) !important;
  visibility: hidden !important;
  transition: none !important;
}

/* Seal button spacing */
.seal-button-space {
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Fade animation */
.fade-out {
  opacity: 1;
  transition: opacity 1s ease;
}

.fade-out.hidden {
  opacity: 0;
}

/* Responsive */
@media (max-width: 480px) {
  .mood-dozen-box {
    grid-template-columns: repeat(3, 75px); /* Keep fixed size */
    grid-template-rows: repeat(2, 75px);
    gap: 0.25rem;
    padding: 1.5rem 0.5rem 2.5rem 0.5rem; /* Less padding for mobile */
    justify-content: center; /* Center grid within box */
    background-position: top center; /* Adjust background image if needed */
  }
     .donut-builder {
    height: 260px;
    margin: 1.5rem auto;
  }
}


body.no-scroll {
  overflow: hidden;
}

/* === Shared Styles === */

.history-page {
  font-family: monospace;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.history-page h1 {
  font-size: 1.5rem;
  margin: 0 0 1rem;
  text-align: center;
}


/* === Receipt Card Base === */
.donut-receipt {
  font-family: monospace;
  background: white;
  padding: 0rem;
  margin: 0rem;
  width: 300px;
}

/* === Enhanced Receipt Style for History Stack === */
.history-page .donut-receipt {
  position: relative;
  background: url('images/receipt-removebg-preview.png') no-repeat center top;
  background-size: cover;
  width: 320px;
  height: 520px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 3rem 1.5rem 1.5rem;
  box-sizing: border-box;
}

/* === Receipt Content === */
.receipt-content {
  width: 90%;
  max-width: 240px;
  text-align: left;
}

/* === Table === */
.donut-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.donut-table th,
.donut-table td {
  padding: 4px 0;
  border-bottom: 1px dotted #ccc;
  font-family: monospace;
  font-size: 0.9rem;
}

/* === Stack Container === */
.receipt-stack {
  position: relative;
  width: 320px;
  height: 520px;
   margin: 0 auto; /* instead of margin: 2rem auto */
  perspective: 1000px;
}

/* === Stacked Receipts === */
.receipt-stack .donut-receipt {
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.4s ease, opacity 0.4s ease;
  transform-origin: center;
  cursor: pointer;
}

/* Stack depth: trailing cards peeking out */
.receipt-stack .donut-receipt:nth-child(1) {
  z-index: 5;
}

.receipt-stack .donut-receipt:nth-child(2) {
  transform: translateY(8px) translateX(-8px) scale(0.98);
  z-index: 4;
}
.receipt-stack .donut-receipt:nth-child(3) {
  transform: translateY(16px) translateX(-16px) scale(0.96);
  z-index: 3;
}
.receipt-stack .donut-receipt:nth-child(4) {
  transform: translateY(24px) translateX(-24px) scale(0.94);
  z-index: 2;
}
.receipt-stack .donut-receipt:nth-child(5) {
  transform: translateY(32px) translateX(-32px) scale(0.92);
  z-index: ;
}


.receipt-content p strong {
  font-size: 0.85rem;
  font-weight: normal;
  text-transform: uppercase; /* Optional for receipt feel */
}

.receipt-divider {
  border: none;
  border-top: 2px dashed #ccc;
  width: 80%;
  margin: 3rem auto;
}

.delete-receipt-btn {
  margin-top: 0.5rem;
  background: transparent;
  border: none;
  color: #d44;
  font-size: 0.85rem;
  cursor: pointer;
  font-family: monospace;
  right: 0%;
}

.clear-all-btn {
  position: absolute;
  bottom: -50px;
  left: 40%;
  transform: translateX(-50%);
  background: none;
  border: none;
  font-family: monospace;
  font-size: 0.85rem;
  color: #555;
  cursor: pointer;
  opacity: 0.8;
  z-index: 10;
}

.clear-all-btn:hover {
  opacity: 1;
  text-decoration: underline;
}


.delete-receipt-btn {
  position: absolute;
  bottom: 50px;
  left: 75%;
  transform: translateX(-50%);
  background: none;
  border: none;
  color: #c33;
  font-family: monospace;
  font-size: 0.85rem;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s;
  pointer-events: auto; /* ensures it works inside stacked cards */
}

.delete-receipt-btn:hover {
  opacity: 1;
  text-decoration: underline;
}

.no-receipts-msg {
  font-family: monospace;
  font-size: 1rem;
  color: #666;
  margin-top: 2rem;
  text-align: center;
}
/* === Donut Builder Layers === */

.donut-builder {
  position: relative;
  width: 100%;
  /*max-width: 400px;*/
    height: min(80vw, 400px);
  margin: 4rem auto;
  background-color: #fff5f7;
}

.donut-layer {
  position: absolute;
  top: 0; /* Each layer uses its own top value */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
  width: auto; /* Don't force full width */
}

/* STACKING LAYERS USING top DIFFERENCE */
#base-carousel {
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

#glaze-carousel {
  top: -8%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

#topping-carousel {
  top: -55%;
 transform: translate(-50%, -50%);
  z-index: 3;
}

/* Scoped Splide for donut builder */
.donut-builder .splide {
  position: relative;
  max-width: 300px;
  padding: 0;
  z-index: inherit;
  /* remove left + translateX */
  margin: 0;
}

.donut-instructions {
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 245, 247, 0.9);
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: bold;
  color: #5b3a2f;
  z-index: 10;
  text-align: center;
  pointer-events: none;
  max-width: 90%;
  line-height: 1.3;
    transition: opacity 0.8s ease;
}


.donut-builder .splide__track {
  overflow: visible !important;
}

.donut-builder .splide__slide img {
  max-height: 140px;
  width: auto;
  height: auto;
  object-fit: contain;
  pointer-events: none;
}

.randomize-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #ffcfd2;
  color: #5b3a2f;
  font-size: 1.5rem;
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 11;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.randomize-button:hover {
  background-color: #f4a8aa;
  transform: scale(1.1);
}
