// ============================================================
// ShadowProbe Mission SPS-01 - Mission Data
// Chandrayaan-2 DFSAR + OHRC South Polar Ice Detection
//
// PROTOTYPE DISCLAIMER:
// All numerical values marked [ILLUSTRATIVE] are representative
// estimates for demonstration purposes only. They are NOT derived
// from actual Chandrayaan-2 mission observations. Real mission
// data analysis requires access to ISSDC-restricted datasets.
// ============================================================

export const PROTOTYPE_DISCLAIMER =
  'Research Prototype - Certain visualizations and numerical values are illustrative and are intended only to demonstrate the proposed workflow. They are not derived directly from Chandrayaan-2 mission observations.';

export const MISSION_INFO = {
  name: 'ShadowProbe',
  missionId: 'SP-01',
  agency: 'ISRO',
  target: 'Lunar South Pole',
  // Chandrayaan-2 DFSAR operates at S-band (2.5 GHz) and L-band (1.25 GHz)
  dataset: 'Chandrayaan-2 DFSAR + OHRC',
  status: 'Research Prototype',
  // Chandrayaan-2 launched 22 July 2019; orbiter operational since Sep 2019
  spacecraft: 'Chandrayaan-2 Orbiter',
  // Nominal orbit altitude
  orbitAltitude: '100 km',
  // OHRC resolution at 100 km altitude
  resolution: '0.25 m/pixel (OHRC)',
  coverage: 'Illustrative',
  instrument: 'DFSAR (S-band / L-band) � OHRC',
};

// ── Landing Candidate Sites ─────────────────────────────────
// Coordinates from IAU Lunar Planetary Gazetteer.
// Ice probability, CPR, DOP and risk values are ILLUSTRATIVE -
// representative of proposed AI pipeline outputs, not observations.
export const LANDING_SITES = [
  {
    id: 'SP-01',
    name: 'Shackleton Rim Alpha',
    crater: 'Shackleton',
    // IAU: 89.54�S, 0.0� - diameter ~21 km
    lat: -89.54,
    lon: 0.0,
    // Mazarico et al. (2011) report ~82-89% solar illumination on Shackleton rim
    illumination: 87.4,
    // [ILLUSTRATIVE] Slope from proposed DEM analysis
    slope: 2.3,
    // Approximate from LOLA-based crater profiles
    elevation: -1842,
    // [ILLUSTRATIVE] CPR based on published PSR CPR ranges (> 1 consistent with ice)
    cpr: 0.87,
    cprNote: 'Illustrative - based on published Chandrayaan-2 DFSAR CPR ranges for PSRs',
    // [ILLUSTRATIVE] Degree of Polarization
    dop: 1.24,
    dopNote: 'Illustrative',
    // [ILLUSTRATIVE] AI model output, not from observations
    iceProbability: 0.92,
    iceProbNote: 'Research Prototype value - not derived from observations',
    riskScore: 0.12,
    scientificScore: 0.96,
    boulderDensity: 'LOW (Illustrative)',
    status: 'OPTIMAL',
    psrCoverage: 96.2,
    traverseDistance: 1.2,
    notes: 'Shackleton crater rim offers highest solar illumination (~87%) in the south polar region. Adjacent to Permanently Shadowed Region floor. High scientific interest for ice detection.',
  },
  {
    id: 'SP-02',
    name: 'Haworth Basin North',
    crater: 'Haworth',
    // IAU: 87.5�S, 5.08�W - diameter ~51 km
    lat: -87.50,
    lon: -5.08,
    illumination: 62.1,
    slope: 3.8,
    elevation: -2103,
    cpr: 0.79,
    cprNote: 'Illustrative',
    dop: 1.18,
    dopNote: 'Illustrative',
    iceProbability: 0.86,
    iceProbNote: 'Research Prototype value - not derived from observations',
    riskScore: 0.19,
    scientificScore: 0.89,
    boulderDensity: 'LOW (Illustrative)',
    status: 'OPTIMAL',
    psrCoverage: 88.1,
    traverseDistance: 2.4,
    notes: 'Large, relatively flat basin. Haworth crater is classified as a major Permanently Shadowed Region. Moderate slope facilitates rover access.',
  },
  {
    id: 'SP-03',
    name: 'de Gerlache Alpha',
    crater: 'de Gerlache',
    // IAU: 88.46�S, 87.64�W - diameter ~32 km
    lat: -88.46,
    lon: -87.64,
    illumination: 52.3,
    slope: 5.1,
    elevation: -2540,
    cpr: 0.72,
    cprNote: 'Illustrative',
    dop: 1.09,
    dopNote: 'Illustrative',
    iceProbability: 0.79,
    iceProbNote: 'Research Prototype value - not derived from observations',
    riskScore: 0.25,
    scientificScore: 0.82,
    boulderDensity: 'MEDIUM (Illustrative)',
    status: 'CANDIDATE',
    psrCoverage: 79.4,
    traverseDistance: 3.7,
    notes: 'Adjacent to de Gerlache crater, a known PSR. Moderate terrain complexity. Strong radar backscatter signals reported in published literature.',
  },
  {
    id: 'SP-04',
    name: 'Nobile Crater West',
    crater: 'Nobile',
    // IAU: 85.20�S, 53.45�E - diameter ~41 km
    lat: -85.20,
    lon: 53.45,
    illumination: 44.7,
    slope: 7.4,
    elevation: -3214,
    cpr: 0.68,
    cprNote: 'Illustrative',
    dop: 1.04,
    dopNote: 'Illustrative',
    iceProbability: 0.74,
    iceProbNote: 'Research Prototype value - not derived from observations',
    riskScore: 0.36,
    scientificScore: 0.76,
    boulderDensity: 'MEDIUM (Illustrative)',
    status: 'CANDIDATE',
    psrCoverage: 91.7,
    traverseDistance: 4.9,
    notes: 'Nobile crater has extensive PSR coverage. Deep floor is permanently shadowed. Elevated slope risk requires careful rover path planning.',
  },
  {
    id: 'SP-05',
    name: 'Faustini Rim Saddle',
    crater: 'Faustini',
    // IAU: 87.20�S, 76.97�E - diameter ~43 km
    lat: -87.20,
    lon: 76.97,
    illumination: 58.4,
    slope: 4.2,
    elevation: -1967,
    cpr: 0.64,
    cprNote: 'Illustrative',
    dop: 0.98,
    dopNote: 'Illustrative',
    iceProbability: 0.70,
    iceProbNote: 'Research Prototype value - not derived from observations',
    riskScore: 0.30,
    scientificScore: 0.72,
    boulderDensity: 'LOW (Illustrative)',
    status: 'CANDIDATE',
    psrCoverage: 72.8,
    traverseDistance: 5.3,
    notes: 'Saddle terrain between Faustini and adjacent ridgeline. Faustini crater floor is a confirmed PSR. Moderate illumination on rim.',
  },
  {
    id: 'SP-06',
    name: 'Shoemaker East',
    crater: 'Shoemaker',
    // IAU: 88.12�S, 44.90�E - diameter ~51 km
    lat: -88.12,
    lon: 44.90,
    illumination: 38.6,
    slope: 6.8,
    elevation: -2789,
    cpr: 0.62,
    cprNote: 'Illustrative',
    dop: 0.94,
    dopNote: 'Illustrative',
    iceProbability: 0.64,
    iceProbNote: 'Research Prototype value - not derived from observations',
    riskScore: 0.39,
    scientificScore: 0.67,
    boulderDensity: 'HIGH (Illustrative)',
    status: 'REVIEW',
    psrCoverage: 83.5,
    traverseDistance: 6.1,
    notes: 'Shoemaker crater is a major PSR. High boulder density requires terrain validation. Wide radar coverage by Chandrayaan-2 DFSAR.',
  },
  {
    id: 'SP-07',
    name: 'Amundsen South Ridge',
    crater: 'Amundsen',
    // IAU: ~84.5�S, 86.5�E - diameter ~101 km
    lat: -84.52,
    lon: 86.50,
    illumination: 61.2,
    slope: 9.1,
    elevation: -1543,
    cpr: 0.54,
    cprNote: 'Illustrative',
    dop: 0.87,
    dopNote: 'Illustrative',
    iceProbability: 0.52,
    iceProbNote: 'Research Prototype value - not derived from observations',
    riskScore: 0.52,
    scientificScore: 0.54,
    boulderDensity: 'HIGH (Illustrative)',
    status: 'REVIEW',
    psrCoverage: 61.2,
    traverseDistance: 8.4,
    notes: 'Amundsen is a large ancient crater. Southern ridgeline has partial PSR. Steeper slopes limit rover accessibility.',
  },
  {
    id: 'SP-08',
    name: 'Cabeus Interior',
    crater: 'Cabeus',
    // IAU: 84.90�S, 35.50�W - diameter ~98 km
    // Note: LCROSS impacted Cabeus crater on 9 Oct 2009 and confirmed water ice in ejecta plume
    lat: -84.90,
    lon: -35.50,
    illumination: 12.4,
    slope: 11.3,
    elevation: -3876,
    cpr: 0.45,
    cprNote: 'Illustrative',
    dop: 0.79,
    dopNote: 'Illustrative',
    iceProbability: 0.41,
    iceProbNote: 'Research Prototype value - not derived from observations',
    riskScore: 0.68,
    scientificScore: 0.43,
    boulderDensity: 'HIGH (Illustrative)',
    status: 'EXCLUDED',
    psrCoverage: 97.1,
    traverseDistance: 12.0,
    notes: 'Historical significance: NASA LCROSS mission impacted Cabeus on 9 Oct 2009, confirming water ice in the ejecta plume (Colaprete et al., 2010, Science). Extreme terrain and near-zero illumination preclude landing. Listed for scientific reference only.',
  },
];

// ── Permanently Shadowed Regions ───────────────────────────
// IAU crater coordinates used for PSR boundary approximations.
// PSR extent values are illustrative - actual PSR boundaries
// require detailed shadow modelling from LOLA DEM.
export const PSR_REGIONS = [
  { id: 'PSR-01', name: 'Shackleton PSR', lat: -89.54, lon: 0.0,   radius: 10.5, shadowDepth: 0.97, note: 'Confirmed PSR; rim partially illuminated' },
  { id: 'PSR-02', name: 'Haworth PSR',    lat: -87.50, lon: -5.08, radius: 25.5, shadowDepth: 0.88, note: 'Major PSR at 87.5�S' },
  { id: 'PSR-03', name: 'de Gerlache PSR',lat: -88.46, lon: -87.64,radius: 16.0, shadowDepth: 0.91, note: 'PSR - strong radar returns reported' },
  { id: 'PSR-04', name: 'Nobile PSR',     lat: -85.20, lon: 53.45, radius: 20.5, shadowDepth: 0.95, note: 'Extensive PSR; high scientific value' },
  { id: 'PSR-05', name: 'Faustini PSR',   lat: -87.20, lon: 76.97, radius: 21.5, shadowDepth: 0.89, note: 'Confirmed PSR; adjacent to accessible rim' },
  { id: 'PSR-06', name: 'Shoemaker PSR',  lat: -88.12, lon: 44.90, radius: 25.5, shadowDepth: 0.93, note: 'Major PSR; extensive DFSAR coverage' },
  { id: 'PSR-07', name: 'Cabeus PSR',     lat: -84.90, lon: -35.50,radius: 49.0, shadowDepth: 0.99, note: 'LCROSS impact site; ice confirmed 2009' },
  { id: 'PSR-08', name: 'Amundsen PSR',   lat: -84.52, lon: 86.50, radius: 50.5, shadowDepth: 0.82, note: 'Partial PSR in large ancient crater' },
];

// ── Mission Metrics ─────────────────────────────────────────
// Values marked [ILLUSTRATIVE] are for demonstration only.
export const MISSION_METRICS = [
  {
    id: 'ice-volume',
    label: 'Est. Ice Volume',
    value: 1847,
    unit: 'km³',
    change: 'Illustrative',
    trend: 'neutral',
    confidence: null,
    module: 'AI Inference',
    description: 'Illustrative estimate of potential subsurface water ice volume in detected PSRs. Not derived from observations.',
    isIllustrative: true,
  },
  {
    id: 'confidence',
    label: 'Model Confidence',
    value: 94.3,
    unit: '%',
    change: 'Illustrative',
    trend: 'neutral',
    confidence: null,
    module: 'AI Inference',
    description: 'Illustrative AI model confidence score for prototype pipeline. Not from actual inference.',
    isIllustrative: true,
  },
  {
    id: 'psrs',
    label: 'PSRs Analysed',
    value: 8,
    unit: 'regions',
    change: 'IAU Catalogue',
    trend: 'neutral',
    confidence: null,
    module: 'Terrain Analysis',
    description: 'Eight major Permanently Shadowed Regions at the lunar south pole from IAU crater catalogue.',
    isIllustrative: false,
  },
  {
    id: 'candidates',
    label: 'Landing Candidates',
    value: 7,
    unit: 'sites',
    change: 'Prototype ranking',
    trend: 'neutral',
    confidence: null,
    module: 'Landing Assessment',
    description: 'Illustrative ranking of candidate landing sites based on proposed multi-criteria scoring.',
    isIllustrative: true,
  },
  {
    id: 'traverse',
    label: 'Planned Traverse',
    value: 14.8,
    unit: 'km',
    change: 'Illustrative',
    trend: 'neutral',
    confidence: null,
    module: 'Rover Planning',
    description: 'Illustrative traverse distance from Shackleton rim lander to Haworth basin target.',
    isIllustrative: true,
  },
  {
    id: 'radar-coverage',
    label: 'DFSAR Coverage',
    value: 89.7,
    unit: '%',
    change: 'Illustrative',
    trend: 'neutral',
    confidence: null,
    module: 'Radar Processing',
    description: 'Illustrative south polar area coverage percentage for prototype demonstration.',
    isIllustrative: true,
  },
  {
    id: 'ohrc-resolution',
    label: 'OHRC Resolution',
    value: 0.25,
    unit: 'm/px',
    change: 'Published spec',
    trend: 'neutral',
    confidence: null,
    module: 'OHRC Processing',
    description: 'Chandrayaan-2 OHRC (Orbiter High Resolution Camera) spatial resolution at 100 km altitude. Published instrument specification.',
    isIllustrative: false,
  },
  {
    id: 'orbit-altitude',
    label: 'Orbit Altitude',
    value: 100,
    unit: 'km',
    change: 'Nominal orbit',
    trend: 'neutral',
    confidence: null,
    module: 'Mission Summary',
    description: 'Chandrayaan-2 nominal circular orbit altitude. Published mission parameter.',
    isIllustrative: false,
  },
];

// ── AI Processing Pipeline ──────────────────────────────────
// Technically accurate processing stages for the proposed workflow.
export const PIPELINE_STAGES = [
  { id: 'dfsar-acq',   label: 'DFSAR Data Acquisition',       status: 'completed', duration: '-',        detail: 'Download Chandrayaan-2 DFSAR S-band & L-band data from ISSDC' },
  { id: 'ohrc-acq',    label: 'OHRC Imagery Acquisition',     status: 'completed', duration: '-',        detail: 'Download OHRC 0.25 m/pixel imagery from ISRO Science Data Archive' },
  { id: 'preprocess',  label: 'Pre-processing & Calibration', status: 'completed', duration: '-',        detail: 'Radiometric calibration, terrain correction, speckle filtering (Lee filter)' },
  { id: 'polari',      label: 'Radar Polarimetric Analysis',  status: 'completed', duration: '-',        detail: 'CPR computation, Stokes parameters, polarimetric decomposition' },
  { id: 'psr-det',     label: 'PSR Identification',           status: 'running',   duration: null,       detail: 'Shadow modelling from TMC-2 DEM; PSR boundary delineation' },
  { id: 'terrain',     label: 'DEM & Terrain Analysis',       status: 'pending',   duration: null,       detail: 'Slope, roughness, boulder density mapping from TMC-2 DEM' },
  { id: 'fusion',      label: 'Feature Fusion',               status: 'pending',   duration: null,       detail: 'Multi-modal stack: CPR + terrain + PSR mask + illumination model' },
  { id: 'ai-inf',      label: 'AI Ice Probability Mapping',   status: 'pending',   duration: null,       detail: 'CNN + Vision Transformer ensemble; pixel-level ice probability (Illustrative)' },
];

// ── Mission Timeline ────────────────────────────────────────
// Technically accurate Chandrayaan-2 data processing workflow.
export const TIMELINE_EVENTS = [
  {
    id: 1,
    date: 'Phase 1',
    label: 'DFSAR Data Acquisition',
    desc: 'Download Chandrayaan-2 DFSAR S-band (2.5 GHz) & L-band (1.25 GHz) SAR data from ISSDC',
    done: true,
  },
  {
    id: 2,
    date: 'Phase 2',
    label: 'OHRC Imagery',
    desc: 'Download Chandrayaan-2 OHRC 0.25 m/pixel optical imagery from ISRO Science Data Archive',
    done: true,
  },
  {
    id: 3,
    date: 'Phase 3',
    label: 'Pre-processing',
    desc: 'Radiometric calibration, terrain correction, speckle filtering, co-registration',
    done: true,
  },
  {
    id: 4,
    date: 'Phase 4',
    label: 'Radar Polarimetric Analysis',
    desc: 'CPR computation, Stokes parameter analysis, polarimetric target decomposition',
    done: true,
  },
  {
    id: 5,
    date: 'Phase 5',
    label: 'PSR Detection',
    desc: 'Illumination modelling from TMC-2 DEM; Permanently Shadowed Region boundary delineation',
    done: false,
    active: true,
  },
  {
    id: 6,
    date: 'Phase 6',
    label: 'DEM & Terrain Analysis',
    desc: 'Slope, roughness, boulder density, and illumination mapping from digital elevation data',
    done: false,
  },
  {
    id: 7,
    date: 'Phase 7',
    label: 'Feature Fusion',
    desc: 'Multi-modal feature integration: CPR, terrain metrics, PSR mask, illumination model',
    done: false,
  },
  {
    id: 8,
    date: 'Phase 8',
    label: 'AI Ice Probability Mapping',
    desc: 'CNN + Vision Transformer ensemble for pixel-level ice probability estimation (Illustrative)',
    done: false,
  },
  {
    id: 9,
    date: 'Phase 9',
    label: 'Landing Site Ranking',
    desc: 'Multi-criteria scoring: ice probability, slope safety, illumination, traverse accessibility',
    done: false,
  },
  {
    id: 10,
    date: 'Phase 10',
    label: 'Rover Traverse Planning',
    desc: 'A* pathfinding with slope limit, hazard avoidance and energy consumption constraints',
    done: false,
  },
  {
    id: 11,
    date: 'Phase 11',
    label: 'Mission Output',
    desc: 'GIS export, mission report generation, visualisation delivery, API integration',
    done: false,
  },
];

// ── Rover Waypoints ─────────────────────────────────────────
// Illustrative traverse from Shackleton rim to Haworth basin.
// Waypoint coordinates are approximate and for demonstration.
export const ROVER_WAYPOINTS = [
  { id: 0, label: 'LANDER',  lat: -89.54, lon: 0.0,   type: 'lander',   note: 'Touchdown - Shackleton Rim Alpha. [Illustrative]' },
  { id: 1, label: 'WP-01',   lat: -89.10, lon: -1.2,  type: 'waypoint', note: 'Communication relay deployment point. [Illustrative]' },
  { id: 2, label: 'WP-02',   lat: -88.60, lon: -2.8,  type: 'waypoint', note: 'PSR boundary science sampling. [Illustrative]' },
  { id: 3, label: 'WP-03',   lat: -88.10, lon: -3.9,  type: 'waypoint', note: 'Core drilling candidate site. [Illustrative]' },
  { id: 4, label: 'TARGET',  lat: -87.50, lon: -5.08, type: 'target',   note: 'Haworth crater rim - primary science target. [Illustrative]' },
];

// ── Feature Cards ───────────────────────────────────────────
export const FEATURE_CARDS = [
  {
    id: 'dfsar',
    icon: 'Radio',
    title: 'DFSAR Analysis',
    subtitle: 'Radar Polarimetry',
    tags: ['CPR', 'S-band', 'L-band', 'Stokes'],
    desc: 'Chandrayaan-2 Dual Frequency SAR analysis using Circular Polarization Ratio to identify volumetric ice scattering signatures in Permanently Shadowed Regions.',
  },
  {
    id: 'ohrc',
    icon: 'Eye',
    title: 'OHRC Processing',
    subtitle: 'High Resolution Optical',
    tags: ['0.25 m/px', 'Orthorectified', 'Surface Mapping'],
    desc: 'Chandrayaan-2 Orbiter High Resolution Camera imagery at 0.25 m/pixel providing surface morphology context and boulder hazard validation.',
  },
  {
    id: 'terrain',
    icon: 'Mountain',
    title: 'Terrain Modeling',
    subtitle: 'DEM � Slope � Illumination',
    tags: ['TMC-2 DEM', 'Slope Map', 'Shadow Model'],
    desc: 'Digital elevation modeling with slope analysis and multi-epoch solar illumination simulation for landing site safety assessment.',
  },
  {
    id: 'ai',
    icon: 'Brain',
    title: 'AI Ice Detection',
    subtitle: 'CNN � ViT � Ensemble',
    tags: ['ResNet-50', 'ViT-B/16', 'Pixel Classification'],
    desc: 'Proposed multi-modal deep learning ensemble combining convolutional and transformer architectures for pixel-level ice probability mapping. [Research Prototype]',
  },
  {
    id: 'landing',
    icon: 'Target',
    title: 'Landing Optimizer',
    subtitle: 'Risk � Science � Access',
    tags: ['Risk Score', 'Sci. Value', 'Illumination'],
    desc: 'Multi-objective optimization balancing landing safety, scientific return, solar illumination availability, and communication window accessibility.',
  },
  {
    id: 'rover',
    icon: 'Truck',
    title: 'Rover Path Planning',
    subtitle: 'A* � Hazard Avoidance',
    tags: ['A* Search', 'Energy Model', 'Slope Limit'],
    desc: 'Energy-efficient A* pathfinding with slope and boulder hazard constraints for autonomous rover traverse planning between landing site and PSR targets.',
  },
];

// ── Visualization Modes ─────────────────────────────────────
export const VIZ_MODES = [
  { id: 'optical',   label: 'Optical Surface (OHRC)',      shortLabel: 'OHRC',  color: '#FFFFFF' },
  { id: 'radar',     label: 'Radar Backscatter (DFSAR)',   shortLabel: 'DFSAR', color: '#4FC3F7' },
  { id: 'cpr',       label: 'CPR Heatmap [Illustrative]', shortLabel: 'CPR',   color: '#F4C542' },
  { id: 'ice',       label: 'Ice Probability [Prototype]', shortLabel: 'ICE',  color: '#6EE7F9' },
  { id: 'elevation', label: 'Terrain Elevation (DEM)',     shortLabel: 'DEM',   color: '#2ECC71' },
  { id: 'psr',       label: 'Permanent Shadow Regions',   shortLabel: 'PSR',   color: '#AAB7C4' },
];

// ── Scientific References ───────────────────────────────────
export const REFERENCES = [
  {
    id: 'r1',
    citation: 'ISRO (2019). Chandrayaan-2 Mission Overview. Indian Space Research Organisation, Bengaluru.',
    url: 'https://www.isro.gov.in/Chandrayaan2.html',
  },
  {
    id: 'r2',
    citation: 'Colaprete, A. et al. (2010). Detection of Water in the LCROSS Ejecta Plume. Science, 330(6003), 463-468.',
    url: 'https://doi.org/10.1126/science.1186986',
  },
  {
    id: 'r3',
    citation: "Hayne, P. O. et al. (2015). Evidence for exposed water ice in the Moon's south polar regions from LRO UV/Vis reflectance and temperature measurements. Icarus, 255, 58-69.",
    url: 'https://doi.org/10.1016/j.icarus.2015.03.032',
  },
  {
    id: 'r4',
    citation: 'Mazarico, E. et al. (2011). Illumination conditions of the lunar polar regions using LOLA topography. Icarus, 211(2), 1066-1081.',
    url: 'https://doi.org/10.1016/j.icarus.2010.10.030',
  },
  {
    id: 'r5',
    citation: 'Spudis, P. D. et al. (2010). Initial results for the north pole of the Moon from Mini-SAR, Chandrayaan-1 mission. Geophysical Research Letters, 37(6).',
    url: 'https://doi.org/10.1029/2009GL042259',
  },
  {
    id: 'r6',
    citation: 'ISRO Science Data Archive (ISSDC). Chandrayaan-2 Science Data. https://pradan.issdc.gov.in/',
    url: 'https://pradan.issdc.gov.in/',
  },
  {
    id: 'r7',
    citation: 'Smith, D. E. et al. (2010). The Lunar Orbiter Laser Altimeter Investigation on the Lunar Reconnaissance Orbiter Mission. Space Science Reviews, 150, 209-241.',
    url: 'https://doi.org/10.1007/s11214-009-9512-y',
  },
];


