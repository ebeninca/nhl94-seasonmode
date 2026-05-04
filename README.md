# NHL94 Season Mode

O codigo dessa aplicação permite simular a função de Temporadas no jogo NHL 94 de Sega Genesis, função que não existe no jogo.

A ideia é escolher um time, jogar e preencher o resultado e estatisticas de seus jogos enquantos os resultados dos adversarios sao simulados pela propria aplicação.

# Novas Funcionalidades

Suporte a playoffs, verificar arquivo tasks.md

# Executando

## Instala Node.js 20 LTS via dnf
sudo dnf module enable nodejs:20
sudo dnf install nodejs npm -y

## Verifica
node --version
npm --version

## install vite
cd /home/ebeninca/repo2/nhl94-seasonmode
npm init -y
npm install --save-dev vite


## Para testar em dev (hot reload):
npx vite

## Para gerar o dist final:
npx vite build

## Para servir o dist e testar:
npx vite preview
