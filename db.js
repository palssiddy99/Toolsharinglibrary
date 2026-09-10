// Realistic, active community equipment records with live borrow transactions
const DEFAULT_SEED_TOOLS = [
  { 
    id: 101, 
    name: 'DeWalt 20V Max Brushless Drill Kit', 
    cat: 'Power Tools', 
    condition: 'Like New',
    rating: '4.9 ★ (18 loans)',
    desc: 'Cordless compact drill driver kit with two 2.0Ah lithium-ion batteries and fast charger.', 
    status: 'borrowed', 
    owner: 'Siddhant P.', 
    borrower: 'Aarav S. (Due tomorrow)',
    dueDate: 'Sep 12, 2026'
  },
  { 
    id: 102, 
    name: 'Honda 21-Inch Self-Propelled Lawnmower', 
    cat: 'Gardening', 
    condition: 'Good Condition',
    rating: '4.8 ★ (24 loans)',
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
    rating: '4.7 ★ (11 loans)',
    desc: 'Low-kickback heavy bar for timber, limb removal, and firewood cutting.', 
    status: 'borrowed', 
    owner: 'Elena V.', 
    borrower: 'Marcus T. (Active Project)',
    dueDate: 'Sep 15, 2026'
  },
  { 
    id: 104, 
    name: 'Little Giant 17ft Multi-Position Ladder', 
    cat: 'Ladders & Access', 
    condition: 'Good Condition',
    rating: '5.0 ★ (31 loans)',
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
    rating: '4.9 ★ (29 loans)',
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
    rating: '4.6 ★ (14 loans)',
    desc: '11-amp motor, includes cutting and grinding wheels with tool-free guard adjustment.', 
    status: 'borrowed', 
    owner: 'Library Admin', 
    borrower: 'Priya N. (Tile cutting)',
    dueDate: 'Sep 11, 2026'
  },
  { 
    id: 107, 
    name: 'Makita 5-Inch Random Orbit Sander', 
    cat: 'Woodworking', 
    condition: 'Like New',
    rating: '4.9 ★ (19 loans)',
    desc: 'Variable speed 3.0 AMP motor with pad brake and dust collection bag. 10 sanding discs included.', 
    status: 'available', 
    owner: 'Siddhant P.', 
    borrower: null 
  },
  { 
    id: 108, 
    name: 'Wagner Control Pro 150 Airless Paint Sprayer', 
    cat: 'Painting', 
    condition: 'Good Condition',
    rating: '4.8 ★ (12 loans)',
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
    rating: '4.7 ★ (22 loans)',
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
    rating: '5.0 ★ (15 loans)',
    desc: 'Pliers, wire strippers, insulated screwdrivers, digital multimeter, and magnetic conduit level.', 
    status: 'borrowed', 
    owner: 'Alex R.', 
    borrower: 'Rohan M. (Wiring project)',
    dueDate: 'Sep 14, 2026'
  },
  { 
    id: 111, 
    name: 'Stihl Gas-Powered Backpack Leaf Blower', 
    cat: 'Gardening', 
    condition: 'Good Condition',
    rating: '4.8 ★ (27 loans)',
    desc: 'High air volume commercial blower for large lawn cleanups and driveway clearing.', 
    status: 'available', 
    owner: 'Community Shed', 
    borrower: null 
  },
  { 
    id: 112, 
    name: 'Bosch 10-Inch Compound Miter Saw', 
    cat: 'Woodworking', 
    condition: 'Like New',
    rating: '4.9 ★ (34 loans)',
    desc: 'Dual-bevel sliding miter saw with laser guide and folding jobsite stand.', 
    status: 'borrowed', 
    owner: 'Vikram D.', 
    borrower: 'Liam W. (Deck framing)',
    dueDate: 'Sep 13, 2026'
  },
  { 
    id: 113, 
    name: 'Milwaukee M18 Heavy Rotary Hammer Drill', 
    cat: 'Power Tools', 
    condition: 'Heavy Duty / Well Used',
    rating: '4.7 ★ (16 loans)',
    desc: 'SDS-Plus concrete drilling hammer with chiseling bits and anti-vibration handle.', 
    status: 'available', 
    owner: 'David K.', 
    borrower: null 
  },
  { 
    id: 114, 
    name: 'Werner 8-Foot Fiberglass Stepladder', 
    cat: 'Ladders & Access', 
    condition: 'Good Condition',
    rating: '4.9 ★ (20 loans)',
    desc: 'Non-conductive fiberglass rails with 300 lb duty rating for electrical and ceiling work.', 
    status: 'available', 
    owner: 'Community Shed', 
    borrower: null 
  },
  { 
    id: 115, 
    name: 'QEP 24-Inch Professional Porcelain Tile Cutter', 
    cat: 'Hand Tools', 
    condition: 'Like New',
    rating: '4.8 ★ (9 loans)',
    desc: 'Manual score and snap tile cutter with tungsten carbide ball-bearing scoring wheel.', 
    status: 'available', 
    owner: 'Elena V.', 
    borrower: null 
  },
  { 
    id: 116, 
    name: 'Champion 2500-Watt Inverter Generator', 
    cat: 'Power Tools', 
    condition: 'Good Condition',
    rating: '5.0 ★ (13 loans)',
    desc: 'Ultra-quiet portable gas inverter generator. Perfect for outdoor workshops without power.', 
    status: 'borrowed', 
    owner: 'Community Shed', 
    borrower: 'Karan J. (Outdoor market)',
    dueDate: 'Sep 16, 2026'
  },
  { 
    id: 117, 
    name: 'Dremel 4300 High Performance Rotary Tool Kit', 
    cat: 'Hand Tools', 
    condition: 'Like New',
    rating: '4.9 ★ (41 loans)',
    desc: 'Includes 45 attachments for engraving, carving, cutting, grinding, and polishing.', 
    status: 'available', 
    owner: 'Siddhant P.', 
    borrower: null 
  },
  { 
    id: 118, 
    name: 'Purdy Professional Paint Roller & Tray Setup', 
    cat: 'Painting', 
    condition: 'Good Condition',
    rating: '4.6 ★ (8 loans)',
    desc: 'Includes heavy-duty 9-inch adjustable cage frame, extension pole, and 3 paint trays.', 
    status: 'available', 
    owner: 'Alex R.', 
    borrower: null 
  },
  { 
    id: 119, 
    name: 'Greenworks 40V Cordless Pole Hedge Trimmer', 
    cat: 'Gardening', 
    condition: 'Like New',
    rating: '4.8 ★ (17 loans)',
    desc: '20-inch steel dual-action blades with 8-position pivoting head for tall bushes.', 
    status: 'available', 
    owner: 'Library Admin', 
    borrower: null 
  },
  { 
    id: 120, 
    name: 'Lincoln Electric 140 MIG Welder Kit', 
    cat: 'Power Tools', 
    condition: 'Good Condition',
    rating: '4.9 ★ (10 loans)',
    desc: 'Runs on standard 120V household power. Includes auto-darkening helmet and chipping hammer.', 
    status: 'available', 
    owner: 'Vikram D.', 
    borrower: null 
  }
];

// Persistent LocalStorage Helpers (Automatically loads the 20 active community items)
function getStoredTools() {
  let stored = JSON.parse(localStorage.getItem('db_tools') || '[]');
  
  // If storage is empty or only has older small batches, update with the full 20 items
  if (stored.length < 15) {
    // Keep any new items the user created manually
    const userCustomTools = stored.filter(t => t.isNew);
    const combined = [...userCustomTools, ...DEFAULT_SEED_TOOLS];
    localStorage.setItem('db_tools', JSON.stringify(combined));
    return combined;
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
