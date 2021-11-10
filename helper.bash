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
    if [ $1 == 'm' ]; then
        env -i git checkout michael
    elif [ $1 == 'd' ]; then
        env -i git checkout dan
    elif [ $1 == 'n' ]; then
        env -i git checkout neb
    elif [ $1 == 'j' ]; then
        env -i git checkout jason
    env -i git status
else
    echo "Unknown arg given. $1 is invalid."
fi
