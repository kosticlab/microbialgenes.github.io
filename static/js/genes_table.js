function renderGenesTableServerSide(ajaxURL, wrapper, callback) {
  $(wrapper).empty();

  var table = $(
    '<table id="server-side-table" style="width:100%;" class="table table-striped table-sm">'
  );
  var genesTableHead = $(
    "<thead>" +
      "<tr>" +
      "<th>Gene ID</th>" +
      "<th class='dt-nowrap'>Gene</th>" +
      "<th class='dt-nowrap'>EC Number</th>" +
      "<th>Product</th>" +
      "<th>NCBI Taxon ID</th>" +
      "<th>Body Site</th>" +
      "<th># Genes in Cluster</th>" +
      "<th>Gene Length</th>" +
      "</tr>" +
      "</thead>"
  );

  // // if table already exists for same query, include previous recordsTotal
  // if ($.fn.dataTable.tables().length > 0) {
  //   var existingTable = $.fn.dataTable.tables({ api: true });

  //   if (existingTable.ajax.url() === ajaxURL) {
  //     ajaxURL = `${ajaxURL}recordsTotal=${
  //       existingTable.page.info().recordsTotal
  //     }&`;
  //     console.log(ajaxURL);
  //   }

  //   // if (existingTable.ajax.json().length < existingTable.page.info().length) {
  //   //   $('#server-side-table_next').addClass('disabled');
  //   // }

  //   $(wrapper).empty();
  // }

  $(table).append(genesTableHead);
  $(wrapper).append(table);

  table.DataTable({
    ordering: false,
    processing: true,
    serverSide: true,
    deferRender: true,
    searching: false,
    filter: false,
    ajax: {
      url: ajaxURL,
      type: "GET"
    },
    columns: [
      { data: "gene_id" },
      { data: "annotation" },
      { data: "ecid" },
      { data: "gene_name" },
      { data: "ncbi_taxon_id" },
      { data: "body_site" },
      { data: "num_genes" },
      { data: "gene_length" }
    ]
  });

  var existingTable = $.fn.dataTable.tables({ api: true });

  // include existing recordsTotal on page change so count(*) doesn't happen twice
  // $(table).on( 'page.dt', function () {
  //   if (!existingTable.ajax.url().includes('recordsTotal')) {
  //     existingTable.ajax.url(`${existingTable.ajax.url()}recordsTotal=${
  //       existingTable.page.info().recordsTotal
  //     }&`);
  //   }
  // });

  $(table).css({
    display: "table",
    width: "100%",
    "word-break": "break-word",
    "margin-top": "10px"
  });

  $.fn.dataTable.ext.errMode = function(settings, helpPage, message) {
    window.location = "/data?file=false";
  };

  callback();
}
