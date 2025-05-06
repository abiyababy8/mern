const projects = require('../Models/projectSchema')
// add project
exports.addProject = async (req, res) => {
    console.log("Inside add project fn in projectController")
    const userId = req.payload
    console.log("UserId:", userId)
    const projectImage = req.file.filename
    // destructure remaining values send from fE
    const { title, language, githubLink, websiteLink, overview } = req.body
    console.log("Values from FE for project:", title, language, githubLink, websiteLink, overview)
    console.log("File name:", projectImage)
    try {
        const existingProject = await projects.findOne({ github: githubLink })
        if (existingProject) {
            res.status(406).json("Project already exists")
            console.log("Project already exists")
        }
        else {
            // Insert project to DB
            console.log("project does not exists")
            const newProject = new projects({
                title: title,
                language: language,
                github: githubLink,
                website: websiteLink,
                overview: overview,
                projectImage: projectImage,
                userId: userId
            })
            await newProject.save()
            res.status(201).json(`${title} added successfully`)
        }
    }
    catch (err) {
        res.status(401).json("Something happened")
    }
}