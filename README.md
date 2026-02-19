## Summary
This is a CI/CD pipeline example for a Genspark training assignment. Code is automatically tested whenever pushed,
main is protected from direct pushes (only updated by merging pull requests), 
and main itself has another pipeline which uploads built code to S3.