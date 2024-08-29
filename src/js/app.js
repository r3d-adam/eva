import AOS from 'aos';
import * as services from './modules/functions.js';
import portfolioGallery from './modules/portfolio.js';
import heroParallax from './modules/hero.js';
import animationsOnScroll from './modules/animationsOnScroll.js';
import testimonials from './modules/testimonials.js';
import forms from './modules/forms.js';
import header from './modules/header.js';

services.isWebp();

AOS.init();

portfolioGallery({ AOS });
heroParallax(0.5);
animationsOnScroll();
testimonials();
forms();
header();
