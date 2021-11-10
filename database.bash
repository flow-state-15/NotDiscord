if [ $1 == 'reseed' ]; then
    flask seed undo
    flask seed all
elif [ $1 == 'hreseed' ]; then
    flask seed undo
    flask seed all
elif [ $1 == 'reset' ]; then
    flask db init
    flask db migrate
    flask db upgrade
    flask seed all
elif [ $1 == 'pullmaster' ]; then
    env -i git checkout master
    env -i git pull
    env -i git checkout $2
else
    echo "Unknown arg given. $1 is invalid."
fi
