import { table_base_config } from '/assets/javascript/table_functions.js';

// get table configuration
export function get_table_config(columns, extraColumnDefs = [], table_id, data_source) {
    return {
        ...table_base_config(extraColumnDefs),
        ajax: {
            url: data_source,
            dataType: 'text',
            dataSrc: function (csvdata) {
                let data = $.csv.toObjects(csvdata);
                return data;
            }
        },
        // allow for different column configurations (set under table)
        columns: columns,
        // notes row creation
        createdRow: function(row, data, dataIndex) {
            if (data.notes && data.notes.trim() !== "") {
                $(row).addClass('has-note');
                $('td', row).first().addClass('dt-control');
            } else {
                $(row).removeClass('has-note');
                $('td', row).first().removeClass('dt-control');
            }
        }
    };
}