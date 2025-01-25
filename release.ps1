# Step 1: Increment the version (patch, minor, or major)
npm version patch

# Step 2: Sync with the remote repository
git pull origin main --rebase # Pull remote changes and rebase your local branch

# Step 3: Push the updated code and the new version tag
git push origin main

# Retrieve the new version from package.json
$VERSION = node -p "require('./package.json').version"

# Create and push the tag
git tag -a $VERSION -m "Release $VERSION"
git push origin $VERSION