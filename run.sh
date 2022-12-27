sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 3000
git checkout master && git pull && MARKER=staging node ./envs/create-env.js && npm install && tmux && node ./index.js