/*
 * Light-weight behaviour for the static screens. No framework — plain DOM.
 * Everything is opt-in through data-attributes so markup stays easy to edit.
 */
document.addEventListener("DOMContentLoaded", () => {
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* Segmented Control (button segments only — link segments navigate) */
  $$("[data-segmented]").forEach((group) => {
    group.addEventListener("click", (e) => {
      const seg = e.target.closest("button.sw-segment");
      if (!seg) return;
      $$(".sw-segment", group).forEach((s) => s.classList.toggle("is-selected", s === seg));
    });
  });

  /* Chip group — single select. Optional data-chip-target updates a text node with the chip label. */
  $$("[data-chip-group]").forEach((group) => {
    group.addEventListener("click", (e) => {
      const chip = e.target.closest("button.sw-chip");
      if (!chip) return;
      $$(".sw-chip", group).forEach((c) => c.classList.toggle("is-selected", c === chip));
      const target = group.dataset.chipTarget && document.querySelector(group.dataset.chipTarget);
      if (target) target.textContent = chip.textContent.trim();
    });
  });

  /* Removable chip */
  document.addEventListener("click", (e) => {
    const remove = e.target.closest(".sw-chip__remove");
    if (remove) remove.closest(".sw-chip").remove();
  });

  /* Risk Metric Table — expand / collapse sub-metrics */
  const setExpanded = (btn, open) => {
    btn.setAttribute("aria-expanded", String(open));
    $$(`[data-parent="${btn.dataset.expand}"]`).forEach((row) => (row.hidden = !open));
    const comment = document.querySelector(`[data-comment-for="${btn.dataset.expand}"]`);
    if (comment) comment.hidden = !open;
  };
  $$("[data-expand]").forEach((btn) => {
    setExpanded(btn, btn.getAttribute("aria-expanded") === "true");
    btn.addEventListener("click", () => setExpanded(btn, btn.getAttribute("aria-expanded") !== "true"));
  });

  /* Unsaved changes → tinted cell + enable "Publish" */
  const publish = document.querySelector("[data-publish]");
  const markDirty = () => publish && (publish.disabled = false);
  $$(".sw-rm-table input, .sw-rm-table select").forEach((el) =>
    el.addEventListener("input", () => {
      el.closest("td").classList.add("is-unsaved");
      markDirty();
    })
  );

  /* "#expanded" reproduces the "Default > Expanded" frame */
  const applyHash = () => {
    if (location.hash !== "#expanded") return;
    $$("[data-expand]").forEach((btn) => setExpanded(btn, true));
    markDirty();
  };
  applyHash();
  window.addEventListener("hashchange", applyHash);

  /* Editor toolbar (contenteditable) */
  $$(".sw-editor").forEach((editor) => {
    const content = editor.querySelector(".sw-editor__content");
    const save = editor.querySelector("[data-editor-save]");
    editor.addEventListener("mousedown", (e) => {
      if (e.target.closest("[data-cmd]")) e.preventDefault(); // keep selection
    });
    editor.addEventListener("click", (e) => {
      const tool = e.target.closest("[data-cmd]");
      if (!tool) return;
      const cmd = tool.dataset.cmd;
      if (cmd === "createLink" || cmd === "insertImage") {
        const url = prompt(cmd === "createLink" ? "Link URL" : "Image URL");
        if (url) document.execCommand(cmd, false, url);
      } else if (cmd === "formatBlock") {
        document.execCommand(cmd, false, tool.dataset.value);
      } else {
        document.execCommand(cmd, false, null);
      }
      content.focus();
    });
    if (content && save) content.addEventListener("input", () => { save.disabled = false; markDirty(); });
  });

  /* Repeating rows: data-add-row="#container" clones the first .js-row; data-remove-row removes its row */
  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add-row]");
    if (add) {
      const container = document.querySelector(add.dataset.addRow);
      const proto = container && container.querySelector(".js-row");
      if (!proto) return;
      const clone = proto.cloneNode(true);
      $$("input", clone).forEach((i) => (i.value = ""));
      $$("select", clone).forEach((s) => (s.selectedIndex = 0));
      container.appendChild(clone);
      return;
    }
    const remove = e.target.closest("[data-remove-row]");
    if (remove) remove.closest(".js-row, tr").remove();
  });

  /* Select-all checkbox */
  $$("[data-select-all]").forEach((all) => {
    const table = all.closest("table");
    all.addEventListener("change", () =>
      $$("tbody input[type=checkbox]", table).forEach((cb) => {
        cb.checked = all.checked;
        cb.closest("tr").classList.toggle("is-selected", all.checked);
      })
    );
    $$("tbody input[type=checkbox]", table).forEach((cb) =>
      cb.addEventListener("change", () => cb.closest("tr").classList.toggle("is-selected", cb.checked))
    );
  });

  /* Upload Dropzone */
  $$(".sw-dropzone").forEach((zone) => {
    const input = zone.querySelector("input[type=file]");
    zone.addEventListener("click", () => input && input.click());
    zone.addEventListener("dragover", (e) => { e.preventDefault(); zone.classList.add("is-dragover"); });
    zone.addEventListener("dragleave", () => zone.classList.remove("is-dragover"));
    zone.addEventListener("drop", (e) => { e.preventDefault(); zone.classList.remove("is-dragover"); });
  });

  /* Pagination — visual active state only */
  $$(".sw-pagination").forEach((p) =>
    p.addEventListener("click", (e) => {
      const btn = e.target.closest(".sw-page-btn");
      if (!btn || btn.textContent.trim() === "…") return;
      $$(".sw-page-btn", p).forEach((b) => b.classList.toggle("is-active", b === btn));
    })
  );
});
