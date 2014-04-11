FLEXPATH=../../../../sdk/flex_sdk_4.6

echo "Batlive.swf"
$FLEXPATH/bin/mxmlc src/Batlive.as -source-path src -o Batlive.swf -debug=true -incremental=false -strict=true -accessible=false -static-link-runtime-shared-libraries=true -link-report=link-report.xml
