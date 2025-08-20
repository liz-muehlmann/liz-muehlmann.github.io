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
        columns: columns
    };
}
