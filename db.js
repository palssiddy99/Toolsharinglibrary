// Pre-seeded database records for community equipment
const DEFAULT_SEED_TOOLS = [
  { 
    id: 101, 
    name: 'DeWalt 20V Max Brushless Drill Kit', 
    cat: 'Power Tools', 
    condition: 'Like New',
    desc: 'Cordless compact drill driver kit with two 2.0Ah lithium-ion batteries and fast charger.', 
    status: 'available', 
    owner: 'Siddhant P.', 
    borrower: null 
  },
  { 
    id: 102, 
    name: 'Honda 21-Inch Self-Propelled Lawnmower', 
    cat: 'Gardening', 
    condition: 'Good Condition',
    desc: 'Gas-powered lawn mower with MicroCut twin blades and variable speed control.', 
    status: 'available', 
    owner: 'Community Shed', 
    borrower: null 
  },
  { 
    id: 103, 
    name: 'Husqvarna 16-Inch Gas Chainsaw', 
    cat: 'Woodworking', 
    condition: 'Heavy Duty / Well Used',
    desc: 'Low-kickback heavy bar for timber, limb removal, and firewood cutting.', 
    status: 'available', 
    owner: 'Elena V.', 
    borrower: null 
  },
  { 
    id: 104, 
    name: 'Little Giant 17ft Multi-Position Ladder', 
    cat: 'Ladders & Access', 
    condition: 'Good Condition',
    desc: 'Convertible ladder adjusts to A-frame, extension, staircase, and 90-degree setups.', 
    status: 'available', 
    owner: 'Community Shed', 
    borrower: null 
  },
  { 
    id: 105, 
    name: 'Kärcher 2000 PSI Electric Pressure Washer', 
    cat: 'Gardening', 
    condition: 'Like New',
    desc: 'Includes surface cleaner attachment, turbo nozzle, and 25-foot kink-free hose.', 
    status: 'available', 
    owner: 'David K.', 
    borrower: null 
  },
  { 
    id: 106, 
    name: 'Bosch 4.5-Inch Angle Grinder', 
    cat: 'Power Tools', 
    condition: 'Good Condition',
    desc: '11-amp motor, includes cutting and grinding wheels with tool-free guard adjustment.', 
    status: 'available', 
    owner: 'Library Admin', 
    borrower: null 
  },
  { 
    id: 107, 
    name: 'Makita 5-Inch Random Orbit Sander', 
    cat: 'Woodworking', 
    condition: 'Like New',
    desc: 'Variable speed 3.0 AMP motor with pad brake and dust collection bag.', 
    status: 'available', 
    owner: 'Siddhant P.', 
    borrower: null 
  },
  { 
    id: 108, 
    name: 'Wagner Control Pro 150 Airless Paint Sprayer', 
    cat: 'Painting', 
    condition: 'Good Condition',
    desc: 'High-efficiency spray system for interior walls, exterior fences, and deck staining.', 
    status: 'available', 
    owner: 'Community Shed', 
    borrower: null 
  },
  { 
    id: 109, 
    name: 'Fiskars Telescopic 14-Foot Tree Lopper', 
    cat: 'Gardening', 
    condition: 'Good Condition',
    desc: 'Heavy branch pruner with chain-drive gearing and precision-ground steel blades.', 
    status: 'available', 
    owner: 'Library Admin', 
    borrower: null 
  },
  { 
    id: 110, 
    name: 'Klein Tools 70-Piece Electrician Hand Tool Kit', 
    cat: 'Hand Tools', 
    condition: 'Like New',
    desc: 'Pliers, wire strippers, insulated screwdrivers, multimeter, and magnetic level.', 
    status: 'available', 
    owner: 'Alex R.', 
    borrower: null 
  }
];

// Persistent LocalStorage Helpers (Never wipes newly added tools)
function getStoredTools() {
  let stored = JSON.parse(localStorage.getItem('db_tools') || '[]');
  if (stored.length === 0) {
    localStorage.setItem('db_tools', JSON.stringify(DEFAULT_SEED_TOOLS));
    return DEFAULT_SEED_TOOLS;
  }
  return stored;
}

function saveStoredTools(tools) {
  localStorage.setItem('db_tools', JSON.stringify(tools));
}

function getStoredUsers() {
  return JSON.parse(localStorage.getItem('db_users') || '[]');
}

function saveStoredUsers(users) {
  localStorage.setItem('db_users', JSON.stringify(users));
}
