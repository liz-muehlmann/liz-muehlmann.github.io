export function table_base_config(extraColumnDefs = []) {
  return {
    // columns
    columnControl: ["order", "searchDropdown"],
    columnDefs: [{
      targets: 0,
      className: "dt-head-left",
    }, ...extraColumnDefs, ],
    // responsive & keep state
    responsive: true,
    stateSave: true,
    ordering: {
      indicators: false,
      handler: false,
    },

    // table layout
    layout: {
      topStart: {
        buttons: ["csv", "excel", "pdf", "print"],
      },
      topEnd: "search",
      bottomStart: "pageLength",
      bottomEnd: "paging"
    },
  };
}

// turn name of source into a link to the source
export function create_linked_name(data, type, row) {
  const { name, link } = row; 
  if (!name || !link) {
    console.error("Row missing required fields (name or link):", row);
    return "";
  }

  return `<a href="${link}" target="_blank">${name}</a>`;
}

export function toggle_notes(row, table) {
    let tr = row.closest('tr');
    let rowData = table.row(tr);

    let noteContent = rowData.data().notes || '';

    if (noteContent.trim() !== '') {
        if (rowData.child.isShown()) {
            rowData.child.hide();
            $(tr).removeClass('shown');
            $('i.fa', tr).removeClass('fa-minus').addClass('fa-plus');
        } else {
            rowData.child(`<div class="notes-content"><i>Notes: </i>${noteContent}</div>`).show();
            $(tr).addClass('shown');
            $('i.fa', tr).removeClass('fa-plus').addClass('fa-minus');
        }
    }
}

// create dropdown filter
export function create_dropdown_filter(table, columnIndex) {
  const column = table.column(columnIndex);

  // create select element
  let select = document.createElement('select');

  select.add(new Option('categories', ''));
  // insert select into header
  $(column.header()).html(select);

  // listen & apply user input
  select.addEventListener('change', function () {
    column
      .search(select.value, { exact: false })
      .draw();
  });

  // populate options
  let uniqueValues = [];
  column
    .data()
    .each(function (d, j) {
      // split comma separated values
      let values = d.split(', ').map(value => value.trim());
      uniqueValues = uniqueValues.concat(values);
    });

  // alphabetize unique values
  uniqueValues = [...new Set(uniqueValues)].sort();

  // add unique values to dropdown
  uniqueValues.forEach(function (value) {
    const option = new Option(value, value);
    select.add(option);
  });
}
