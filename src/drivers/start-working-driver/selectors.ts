export const selectors = {
  notWorkingHint:
    "#hwm_header .sh_MenuPanel .mm_item a[href='map.php'] .NotificationIcon",
  map: "#MenuMap",
  jobsItems: "table.wb .map_obj_table_hover",
  jobPrice: "td:nth-child(4)",
  jobLink: "td:last-child a",
  availableJobLinks:
    "table.wb .map_obj_table_hover:not(.map_obj_table_div_gray) td:nth-child(5)",
  manufacturingJobsList: ".job_fl_btns_block a:nth-child(3)",
  processingJobsList: ".job_fl_btns_block a:nth-child(2)",
  miningJobsList: ".job_fl_btns_block a:nth-child(1)",
  startWorkingButton: ".getjob_hover",
};
