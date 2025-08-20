---
title: Job Hunting
layout: resources
headname: Job Hunting
---

<h1>about these resources</h1>
<hr class = "h-line">

<p>I found job hunting to be particularly soul-crushing. You're alone, applying to jobs you think you're a perfect match for only to be rejected to simply never hear back. It's an incredibly isolating experience. To cope, I started compiling a list of resources that I was using so that I could share them with other people. Most of the jobs are related to politics or <a href="https://buttondown.com/monteiro/archive/how-to-not-build-the-torment-nexus/">non-torture-nexus-building</a> tech, but there are some for climate, marketing, media, and philosophy. Anything I found helpful is included in the table.
<br/><br/>
<b><i>Note:</i></b> Some rows have extra notes. Click on the + symbol to view and the - symbol to hide.
</p>

<h1>categories</h1>
<hr class = "h-line">
<p><b><i>Note:</i></b> Categories are kept as broad as possible. For example, <i>aggregators</i> include any site that includes multiple job types, like NGO and tech. Job Fairies are people who regularly share jobs and resources. 
<br/><br/>
In the table below, you can use the categories dropdown to filter for a specific type of job board (e.g., aggregator, NGO, etc.). To clear your search select the <i>categories</i> option.
</p>

<h1>job boards</h1>
<hr class = "h-line">
<table id="resources-jobs" class="table table-striped table-hover" style="width:100%">
    <thead class = "table-header">
      <tr>
        <th>added</th>
        <th>name</th>
        <th>type</th>
        <th>description</th>
        <th>notes</th>
      </tr>
    </thead>
    <tfoot>
    <tr>
      <td colspan="6"><b><i>Broken link? Want to contribute?</i></b> Send me an email by clicking on the email icon at the bottom of the page.</td>
    </tr>
</tfoot>    
</table>

<!-- data table options -->
<script type="module"> 
    // import custom scripts
    import { create_linked_name, create_dropdown_filter } from '/assets/javascript/table_functions.js';
    import { get_table_config } from '/assets/javascript/table_config.js';

    // import constants
    const table_id = '#resources-jobs';
    const data_source = "/assets/download/download_resources/resources_jobs.csv";

    // define column structure
    const columns = [
        // change per table
        { data: 'added' },
        { data: 'name' },
        { data: 'type' },
        { data: 'description' },
        { data: 'notes' }
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

    table.on('init', function () {
        create_dropdown_filter(table, 2); 
    });
</script>
