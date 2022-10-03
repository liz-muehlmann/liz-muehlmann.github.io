1. download gdb data from the PAD-US Website:
    https://www.sciencebase.gov/catalog/item/61794fc2d34ea58c3c6f9f69
    under Attached Files download "PADUS3_0Geodatabase.zip"
    Unzip the folder

qgis download: https://qgis.org/en/site/
once downloaded: 
    1. you'll see this page (qgis-1)
    2. in the browser panel (top left) navigate to where the unzipped file is.
    3. Locate the folder: PAD_US3_9.gdb (qgis-2)
        inside the folder click on PADUS3_0Fee and drag it to the layers panel (bottom left) (qgis-3)
        qgis will load the data without a basemap - which is fine
    4. Right click on the PADUS3_0Fee layer in the bottom left
        From the pop up menu select "Export" 
        Then select "save features as" (qgis-4)
    5. A new window will open and there's a couple of settings to change (qgis-5)
        Select the following:
        **Format:** "ESRI Shapefile"
        **File name:** this is the path to where you want to save the file AND what you want to name it. 
            For me I named it "padus_qgis.shp"
        **Layer name:** you can leave it blank
        **CRS:** Default CRS: EPSG:4326 - WGS 84
        Under "Select fields to export and their export options choose "select all"
        Uncheck "Add saved file to map." this is optional, but it will load all the data that's already loaded so I don't see a point in having it checked. 
    6. Hit Okay.
    7. Now you can load the file like normal using sf_read("path/to/file.shp") in R. 