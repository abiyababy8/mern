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
            res.status(406).json(`${title} Project already exists`)
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
//get Home Project
exports.getHomeProject = async (req, res) => {
    try {
        const homeprojects = await projects.find().limit(3)
        res.status(200).json(homeprojects)
    }
    catch (err) {
        res.status(401).json("Request Failed")
    }
}
//get All Projects
exports.getAllProject = async (req, res) => {
    //accessing value passed in URL
    const userSearchKey = req.query.search
    console.log("Search Key:", userSearchKey)
    const query = {
        // search by language
        language: {
            $regex: userSearchKey, $options: 'i' //2nd argument: to avoid case sensitivity   
        }
        // search by both title and language
        // $or: [
        //     { language: { $regex: userSearchKey, $options: 'i' }},
        //     { title: { $regex: userSearchKey, $options: 'i' }}
        // ]
    }
    try {
        const allProject = await projects.find(query)
        res.status(200).json(allProject)
    }
    catch (err) {
        req.status(401).json(err)
    }
}
//get user projects
exports.getUserProject = async (req, res) => {
    try {
        const userId = req.payload;
        const userprojects = await projects.find({ userId: userId })
        res.status(200).json(userprojects)
    }
    catch (err) {
        res.status(401).json(err)
    }
}
// update user project
exports.updateUserProject = async (req, res) => {
    const { id } = req.params
    const userId = req.payload
    const { title, language, githubLink, websiteLink, overview, projectImage } = req.body
    console.log("Inside update project!")
    console.log(id)
    console.log(userId)
    console.log(title, language, githubLink, websiteLink, overview, projectImage)
    const uploadprojectimage = req.file ? req.file.filename : projectImage
    try {
        const updateProject = await projects.findByIdAndUpdate({ _id: id }, {
            title: title,
            language: language,
            github: githubLink,
            website: websiteLink,
            overview: overview,
            projectImage: uploadprojectimage,
            userId: userId
        },
            {
                new: true  //used to define update
            })
        await updateProject.save()
        res.status(200).json(updateProject)
    }
    catch (err) {
        res.status(401).json(err)
    }
}
// delete user project
exports.deleteProject = async (req, res) => {
    const { id } = req.params
    try {
        const removeproject = await projects.findByIdAndDelete({ _id: id })
        res.status(200).json(removeproject)
    }
    catch (error) {
        res.status(401).json(error)
    }
}