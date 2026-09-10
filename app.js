let btn = '';
        let borrowNote = '';

        if (!isBorrowed) {
          btn = `<button class="btn-action btn-borrow" onclick="toggleBorrow(${t.id})">Borrow This Equipment</button>`;
        } else if (isMyBorrow) {
          btn = `<button class="btn-action btn-return" onclick="toggleBorrow(${t.id})">Return Tool</button>`;
        } else {
          btn = `<button class="btn-action btn-disabled" disabled>In Use by Member</button>`;
          borrowNote = `<div style="font-size: 0.78rem; color: #d97706; margin-top: 0.4rem; font-weight: 600;">Currently with: ${t.borrower}</div>`;
        }

        return `
          <div class="tool-card ${t.isNew ? 'user-created' : ''}">
            <div>
              <div class="tool-header">
                <span class="tag tag-cat">${t.cat}</span>
                ${t.isNew ? '<span class="tag tag-new">YOUR LISTING</span>' : ''}
                <span class="tag tag-status ${isBorrowed ? 'borrowed' : ''}">${isBorrowed ? 'In Use' : 'Available'}</span>
              </div>
              <div class="tool-title">${t.name}</div>
              <div style="font-size: 0.8rem; color: #4f46e5; font-weight: 600; margin-bottom: 0.4rem;">
                ${t.rating || '★ 5.0 (New)'} • <span style="color: #64748b;">${t.condition || 'Good'}</span>
              </div>
              <div class="tool-desc">${t.desc}</div>
            </div>
            <div class="tool-footer">
              <div class="owner-info">
                <span>Owner: <b>${t.owner}</b></span>
                <span>Ref: #${t.id.toString().slice(-4)}</span>
              </div>
              ${btn}
              ${borrowNote}
            </div>
          </div>
        `;
