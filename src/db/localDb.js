const STORAGE_KEYS = {
  TOOLS: 'toolshare_items_v1',
  BORROWS: 'toolshare_borrows_v1'
};

const SEED_TOOLS = [
  {
    id: 't-101',
    name: 'Bosch 18V Cordless Drill Kit',
    category: 'Power Tools',
    deposit: 15,
    condition: 'Excellent',
    owner: 'Rahul S.',
    contact: 'rahul.s@campus.edu',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80',
    description: 'Comes with two 2.0Ah batteries, charger, and 30-piece screw/drill bit set.'
  },
  {
    id: 't-102',
    name: 'Heavy Duty 46-Piece Socket Wrench Set',
    category: 'Hand Tools',
    deposit: 8,
    condition: 'Good',
    owner: 'Pooja M.',
    contact: 'pooja.m@campus.edu',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=600&q=80',
    description: '1/4 inch drive socket set made from chrome vanadium steel. Ideal for bikes & engines.'
  },
  {
    id: 't-103',
    name: 'Electric Hedge Trimmer & Pruner',
    category: 'Gardening',
    deposit: 12,
    condition: 'Like New',
    owner: 'Karan D.',
    contact: 'karan.d@campus.edu',
    status: 'Borrowed',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef231f8?auto=format&fit=crop&w=600&q=80',
    description: '550W powerful motor with 450mm dual action blades for quick hedge maintenance.'
  },
  {
    id: 't-104',
    name: 'Compact Digital Laser Distance Meter',
    category: 'Measurement',
    deposit: 5,
    condition: 'Good',
    owner: 'Aman V.',
    contact: 'aman.v@campus.edu',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=600&q=80',
    description: 'Measures up to 40 meters with millimeter precision. Backlit LCD display.'
  }
];

export const localDb = {
  getTools: () => {
    const raw = localStorage.getItem(STORAGE_KEYS.TOOLS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(SEED_TOOLS));
      return SEED_TOOLS;
    }
    return JSON.parse(raw);
  },

  saveTool: (tool) => {
    const tools = localDb.getTools();
    const newTool = {
      ...tool,
      id: `t-${Date.now()}`,
      status: 'Available'
    };
    const updated = [newTool, ...tools];
    localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(updated));
    return updated;
  },

  getBorrows: () => {
    const raw = localStorage.getItem(STORAGE_KEYS.BORROWS);
    return raw ? JSON.parse(raw) : [];
  },

  borrowTool: (toolId, borrowerName, durationDays) => {
    const tools = localDb.getTools();
    const toolIndex = tools.findIndex(t => t.id === toolId);
    if (toolIndex === -1) return null;

    tools[toolIndex].status = 'Borrowed';
    localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(tools));

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + parseInt(durationDays || 3));

    const borrowRecord = {
      id: `b-${Date.now()}`,
      toolId,
      toolName: tools[toolIndex].name,
      category: tools[toolIndex].category,
      borrower: borrowerName || 'Self (Current User)',
      borrowDate: new Date().toLocaleDateString(),
      dueDate: dueDate.toLocaleDateString(),
      status: 'Active'
    };

    const borrows = localDb.getBorrows();
    const updatedBorrows = [borrowRecord, ...borrows];
    localStorage.setItem(STORAGE_KEYS.BORROWS, JSON.stringify(updatedBorrows));

    return { updatedTools: tools, updatedBorrows };
  },

  returnTool: (borrowId) => {
    const borrows = localDb.getBorrows();
    const borrowRecord = borrows.find(b => b.id === borrowId);
    if (!borrowRecord) return null;

    borrowRecord.status = 'Returned';
    borrowRecord.returnedDate = new Date().toLocaleDateString();
    localStorage.setItem(STORAGE_KEYS.BORROWS, JSON.stringify(borrows));

    const tools = localDb.getTools();
    const tool = tools.find(t => t.id === borrowRecord.toolId);
    if (tool) {
      tool.status = 'Available';
      localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(tools));
    }

    return { updatedTools: tools, updatedBorrows: borrows };
  },

  resetDefaults: () => {
    localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(SEED_TOOLS));
    localStorage.removeItem(STORAGE_KEYS.BORROWS);
    return { tools: SEED_TOOLS, borrows: [] };
  }
};
