#!/bin/bash
echo "$0: JSON to Markdown used combine with dfetcher.py!"
if [ -z $1 ];then
echo "You should input one directory location!"
exit
fi
# Processing ...
python3 dfetcher.py $1 | tee tmp000
torsimany References/dres.json
torsimany References/fres.json
sed 's/## Childroot ##/subroot:/g' References/dres.markdown > tmp000
mv tmp000 References/dres.markdown
