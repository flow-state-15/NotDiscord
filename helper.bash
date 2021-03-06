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
    echo -Switchin to master branch
    env -i git checkout master
    echo -Pulling changes from master branch
    env -i git pull
    echo -Switching back to user branch
    if [ $2 == 'm' ]; then
        env -i git checkout michael
    elif [ $2 == 'd' ]; then
        env -i git checkout dan
    elif [ $2 == 'n' ]; then
        env -i git checkout neb
    elif [ $2 == 'j' ]; then
        env -i git checkout jason
    fi
    echo -Getting status info
    env -i git status
    echo -Command Complete
else
    echo "Unknown arg given. $1 is invalid."
fi
