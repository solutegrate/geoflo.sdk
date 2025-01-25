# Step 1: Increment the version (patch, minor, or major)
npm version patch

# Step 2: Sync with the remote repository
git pull origin main --rebase # Pull remote changes and rebase your local branch

# Step 3: Push the updated code and the new version tag
git push origin main
$VERSION = node -p "require('./package.json').version"
git push origin $VERSION

# Step 4: Create a GitHub release
gh release create $VERSION --title "Release $VERSION" --notes "New Release"