---
title: Data
layout: resources
headname: Data
---

<h1>about these resources</h1>
<hr class = "h-line">

<p> I collected most of these datasets during my PhD when I founded the Political Science Resource Board. 
<br/><br/>
One of the most common complaints students (including myself) had was that we did not know what data was available and if it could be used for our research. I started compiling a list of any data set I found and freely shared it with others. 
<br/><br/>
I have also included other non-Political Science-related datasets that I've found over the years. </p>

<h1>categories</h1>
<hr class = "h-line">
<p><b><i>Note:</i></b> Categories are kept as broad as possible. For example, <i>politics</i> includes legislation, elections, war, public opinion, and more.
<br/><br/>
In the table below, you can use the categories dropdown to filter for a specific type of job board (e.g., aggregator, NGO, etc.). To clear your search select the <i>categories</i> option.
</p>




<h1>datasets</h1>
<hr class = "h-line">
<table id="resources-data" class="table table-striped table-hover" style="width:100%">
    <thead class = "table-header">
      <tr>
        <th>more</th>
        <th>added</th>
        <th>name</th>
        <th>abbreviation</th>
        <th>topic</th>
        <th>free?</th>
        <th>description</th>
      </tr>
    </thead>
    <tfoot>
    <tr>
        <td colspan="7"><b><i>Broken link? Want to contribute?</i></b> Send me an email by clicking on the email icon at the bottom of the page.</td>
    </tr>
</tfoot>    
</table>

<!-- data table options -->
<script type="module">
    // import functions
    import { toggle_notes, create_linked_name, create_dropdown_filter } from '/assets/javascript/table_functions.js';
    import { get_table_config } from '/assets/javascript/table_config.js';

    // table id & data source
    const table_id = '#resources-data';
    const data_source = "/assets/download/download_resources/resources_data.csv";

    // column structure
    const columns = [
      // this block is for if there's a notes column
        {
            className: 'dt-control details-control',
            orderable: false,
            data: null,
            defaultContent: '',
            searchable: false,
            render: (data, type, row) => row.notes && row.notes.trim() !== '' ? '<i class="fa fa-plus" aria-hidden="true"></i>' : '',
            width: "15px"
        },
        // change these per data set
        { data: 'added' },
        { data: 'name' },
        { data: 'abbreviation' },
        { data: 'topic' },
        { data: 'free?' },
        { data: 'description' },
    ];

    // column definitions
    const columnDefs = [
        { searchable: false, targets: 0 },
        {
            targets: 2,
            render: (data, type, row) => create_linked_name(data, type, row)
        }
    ];

    // initialize the data table
    const table_config = get_table_config(columns, columnDefs, table_id, data_source);
    const table = new DataTable(table_id, table_config);

    // toggle notes
    table.on('click', 'tbody td.dt-control', function(e) {
      let row = e.target; 
      toggle_notes(row, table); 
    });

    table.on('init', function () {
      create_dropdown_filter(table, 4); 
    });
</script>