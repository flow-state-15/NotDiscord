if [ $1 == 'reseed' ]; then
    flask seed undo
    flask seed all
elif [ $1 == 'reset' ]; then
    flask db init
    flask db migrate
    flask db upgrade
    flask seed
else
    echo "Unknown arg given. $1 is invalid."
fi
