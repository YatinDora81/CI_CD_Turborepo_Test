cd projects/CI_CD_Turborepo_Test
git stash
git pull origin main
git stash apply
pnpm i
pnpm build
pm2 restart all