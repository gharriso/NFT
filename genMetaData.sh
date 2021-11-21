 ipfs ls -v /ipfs/QmTNzpwjnvwb6iyiPsZqLoQeecpKwhnJkCLPoGM1SGexqX|while read LINE;do
    hash=`echo $LINE|cut -f1 -d' '`
    file=`echo $LINE|cut -f3 -d' '`
    name=`echo $file|cut -f1 -d'.'`
    echo "$hash $file $name"
cat >metaData/$name.json <<EOF
{
    "description" : "Mandala $name by Jenny Kiley",
    "image" : "https://ipfs.io/ipfs/$hash",
    "artist" : "Jenny Kiley"
}
EOF
done

