---
title: Centers & Organizations
layout: resources
headname: Centers & Organizations
---

<h1>about these resources</h1>
<hr class = "h-line">

<p>I like to keep track of centers and organizations that are doing good work. A lot of them relate to protecting or enhancing democracy, using tech for good, or community, but there are others here too. Sometimes they have funding calls, most of them have cool workshops, others have useful newsletters. </p>

<h1>categories</h1>
<hr class = "h-line">
<p><b><i>Note:</i></b> Categories are kept as broad as possible. For example, organizations working on <i>democracy</i> can include judicial, legislative, executive, participation, or rights.
<br/><br/>
In the table below, you can use the categories dropdown to filter for a specific work area (e.g., democracy, tech, labor, etc.). To clear your search select the <i>categories</i> option.
</p>


<h1>datasets</h1>
<hr class = "h-line">
<table id="resources-orgs" class="table table-striped table-hover" style="width:100%">
    <thead class = "table-header">
      <tr>
        <th>added</th>
        <th>name</th>
        <th>area</th>
        <th>type</th>
      </tr>
    </thead>
    <tfoot>
    <tr>
      <td colspan="5"><b><i>Broken link? Want to contribute?</i></b> Send me an email by clicking on the email icon at the bottom of the page.</td>
    </tr>
</tfoot>    
</table>

<!-- data table options -->
<script type="module"> 
    // import custom scripts
    import { toggle_notes, create_linked_name, create_dropdown_filter } from '/assets/javascript/table_functions.js';
    import { get_table_config } from '/assets/javascript/table_config.js';

    // import constants
    const table_id = '#resources-orgs';
    const data_source = "/assets/download/download_resources/resources_orgs.csv";

    // define column structure
    const columns = [
        { data: 'added' },
        { data: 'name' },
        { data: 'area' },
        { data: 'type' }
    ];

    // column to be linked
    const columnDefs = [
        {
            targets: 1,  
            render: function(data, type, row) {
                return create_linked_name(data, type, row);  
            }
        }
    ];
 
    // configure table
    const table_config = get_table_config(columns, columnDefs, table_id, data_source);

    // init dataTable
    let table = new DataTable(table_id, table_config);
  
    // notes row toggle
    table.on('click', 'tbody td.dt-control', function(e) {
        let row = e.target;
        toggle_notes(row, table);
    });

    table.on('init', function () {
        create_dropdown_filter(table, 2); 
    });
</script>
