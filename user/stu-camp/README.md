# STU-CAMP/USER
Front-end codes

# Things that work till this version:
* The side dashboard with its own backdrop
* Not closing dashboard when 'theme' option is clicked
* The nav button highlighter issue fixed, so it is working as expected
* Used redux-toolkit to manage all of the existing state: jan 19th
* Dark mode implemented on components designed till date: jan 19th
* The settings dashboard completely re-modeled, and workable in both mobile and laptop view
* Responsive for laptop, mobile and Ipads/tablets: nov 9th
* Working CRUD operations related to students
* Working 'report users' and 'manage reports' functionality
* Fitler posts according to the slider
* Working deletion of posts according to roles and ownership
* Working reset password for students and admin
* Post/Share component support pictures
* Send email of the notification

# Bugs:
* Responsiveness is wonky
* The password validation regex is busted 
* The text area focus vs InputBox focus, makes the box blurry 

# To-Do:
* Make the post expandable and shrinkable as needed, according to the content (body, img) of the post
* Design the post's feature:
    * Write a comment
    * Expand to see previous comments
    * Integrate comments in '@' style without going more than one level deep
* Put title and message word limit for notification (admin)
