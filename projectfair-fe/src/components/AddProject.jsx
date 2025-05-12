import React, { useContext, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { addProjectApi } from '../services/allApi';
import { addProjectResponseContext } from '../Context/ContextShare';

function AddProject() {
    const [show, setShow] = useState(false);
    const [token, setToken] = useState("")
    // import states created inside contextApi
    // useContext() hook is used to access the contextApi
    const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext)
    const [projectDetails, setProjectDetails] = useState({
        title: "",
        language: "",
        githubLink: "",
        websiteLink: "",
        overview: "",
        projectImage: ""
    })
    const [preview, setPreview] = useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        if (projectDetails.projectImage) {
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
    }, [projectDetails.projectImage])
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'))
        }
    }, [])
    const addProject = async () => {
        console.log("Project Details:", projectDetails)
        const { title, language, githubLink, websiteLink, overview, projectImage } = projectDetails
        if (!title || !language || !githubLink || !websiteLink || !overview || !projectImage) {
            toast.warning("Please the fill the form completely!!!")
        }
        else {
            // send data to backend
            //here we have to send a file, so instead of sending as object, we are passing data as formdata
            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("language", language)
            reqBody.append("githubLink", githubLink)
            reqBody.append("websiteLink", websiteLink)
            reqBody.append("overview", overview)
            reqBody.append("projectImage", projectImage)
            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
            const result = await addProjectApi(reqBody, reqHeader)
            if (result.status == 201) {
                setAddProjectResponse(result.data)
                toast.success(result.data)
                handleClear()
                handleClose()
            }
            else if (result.status == 406) {
                toast.warning(`${title} already exists, please add a new project`)
            }
            else {
                toast.error("Something happened !!!")
            }
        }
    }
    const handleClear = () => {
        setProjectDetails({
            title: "",
            language: "",
            githubLink: "",
            websiteLink: "",
            overview: "",
            projectImage: ""
        })
        setPreview("")
    }
    return (
        <>
            <button className='btn btn-success' onClick={handleShow}>ADD PROJECT</button>
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-success'>ADD NEW PROJECT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6 mt-3">
                            <label htmlFor="projectImg">
                                <input type="file" id='projectImg' style={{ display: 'none' }} onChange={(e) => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} />
                                <img src={preview ? preview : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAq1BMVEUsv67////u7+5XW20qw7FYV2skvqxIgoX18fEXvKrk5eVHh4lRVWj28fH09fPy8O9cYXKL1MqUlp/w+vmy5d7m9/W+4t3Z8u9nzsHN7up0zsNOUmZJx7iR2tGo4to2wrLN5uPP7+u+6eOA1cqf2dHl7eu3ub7C5N9YyLqq4dq56OJ10sbb6ueg2dHd3+CnqbDJy86Ag48+m5a9v8NARVxwdIKHiZSur7ZwjJLjwk/bAAAMUUlEQVR4nOWdC3faNhTHBek0qws41AQ71GCCoTWPZO3abvv+n2yyIdjg171Xkh/L/2w9ZzuF6Bdd3YeebGBcjrueLhcHL/KDIGCMyT/9yDssltO165j/8czgd0u0xcFnIhbn7FqcJ/+fRYfF3iioKUJ3GkZBTMZu0W5AGU84w71rqCUmCN2dx+rZcpzM25mg1E3orENWYJMgzJgy3Ou2WK2Ej1OP0+gylNzbPepslD5CZx/jKdBdKAWPpvp6Uhfh80FowXuDFIdnTS3TQugsfY14b5D+UktHaiB0J0xoxjtJ+h0NzlWZ0PV0mue1pN/xnlsmfIqM4Z0hRfTUIuGzZ8Y8tTIqEEr7NNt/KaOnMB7JhE7YEN+JMST7VSrhskG+WIIvGyV88hsYgLeMPm04kgjD5vkSxrAhwjVvBzAejusGCJ1DwyPwGvGA9jhYwqegrQ48SQTY0YgkXLTLlzAuDBI+tuBC8xI+qkLGEK4RMy8mxRnG4SAIN13owJMwlgonbCLLBkt42gmdTgzBVDyADkYgoRt0Ywim4gGw3oARrrvGF4vD/A2IcNdiGlMuLna6CJfdGoKpBKSiAhB2II8pk9joIOwwICgw1hJ2GhCCWEfYcUCAodYQdtbJpKpzN9WEu+4DSsQpnXDdB0CJWFkUVxG6SoudzYnzqgSugtAJ2m46WEHF7E0Fod+PHozFfQphp+rBOlXUi6WEHaroISqP/GWEPXGjqUoni0sIH9tuMF68pOgvIeyRl3lTmbcpJux8NlqkkqFYSPjUR8Cy3KaIsEeh/lqFgb+I8NDPLpSdeIAR9i5QpCoKGQWEPcm3CyXydponbGkJW4943k5zhD31o2/K+9Mcod92GxWVi/u3hD2YmKlWbtrmhtDpO2De2dwQhj32o2fxsIrQVetC/nZOpNWAI9wKQk+hZZItiOaLl9l0twk9X8+udlJDvHJChUghRLRZbW3LlrJsy9oeZ/PazdGnDtf+qxDPpYQR8WdxwRZHiTbMSv7nrGIHsexjf/Iync12L6GveErj9qu9MkJqF4rgZWgNC2SPVlHxd4pgPhuO3np8NJzNde61ugr7WcKI9n18srWL+E4dOStouvyVbC37+nexfdHHyKNiQpoj5cHKKgWUsoa5RFdstnb+I/Z2o21EZt1phpDkSIU3rOJLGKdXX8z9Y6FJy794LLFptLIjkal1oZjU8cUtX2U/MS//ldj5/qYiPhYQUtIZEKBs+Qr6CXuiB1FM8oQOYVueCEvsLd+L52ggJjWfsPQgcubkCAlFBZ8DAWXfzPjpE7V9PpprQUxLjAshoS70t1BA2fCXuOF+rVuS0lOh+reEz4QuXIEG4VmWTJgE5BP2SkvMuKRub4QH9NfWDqkbHbmYj0C/Cy1D8TJjcybEV76cofhkwzeiPPfJyt5qAEwr4TPhFE0odhgbjbVdADt9NNFhp2J/RYjPZwIkH0ZHLWbqZQkf8aNwg+1ChEbUMu4a8TFDSNgZdDQHOLRfdHTieScRoxkp93COFCmdZpoQOngj3Rkl3GrZVs6dC+EeHytWJgGHQy0D8bQSxUhlBQ+MduHQmmvpw/BCiC4rDA9DmdakLaKzcvZGiK99OTJjw8qOCeMZ1yCKvMhPbq8hKJnMYKRYYdjRJKlpNJkd7ZE1kv9Yx6+biHA1RXJcgZESGjE1GO+l7MXmav41nnQ87tD3NyTxglGGIRMzs4TDojrSHpbNvpYSshMhYQrKPGGh7NFX3AGzeCAySl3RFmHcjxOMqcb1BSNNspkehxWyZojmxhGRkSbzxUtrhEP7iEjpopjQIeSAHDqNaARxC945yQNHEpLmuiPQjIsxRPDGO+lqGCHtjkVt3fjLWAMieDpOuhpG20uKm0nMAP74+UMH4gzYaLGQhPh5xOSTtIH4end396pOOLSAAYAfJCFlipkLn9ay7/d39981ENrQGtmXhOicTYhgvtkhZvQvGv/5Wfbh5z912CmsXJB5G0POBXMe7bbxAjwF8NvPu1g/v2lAHMH8qXAYLliI+coih8KPD3cnPXxUJwQ6G+EyzI5gHswq1+yrNf50fya8/6ShE4egkSjWDJF3i/lWIZUZf/l896bPGkKGBZr7F1MGXxkVE6VE5vX+LtW9esiwV5CWiyVbgNODjVIuOv51RfhLg51C4hxfMGjAF6FSOXEKFKk0hIwRZMqRH5gHA+SRUmvG364BJaJyyLBAIdFjwOpQHJW68BIoUjtVDhn2VwhhxGBJm6KXGf99f0t4d/+3aiceIQPMZ8BSi5KkpYBfbm00sVPVQgqyGs4DGCF2V8IN4GsRoER8VUO0IU0H9iBXWw/9lbfRU8hQ+tahpfGMXaTiZm4DhbaQoZFQaSEmHyi0hQxtgGoTwB+LTfQshZBhH/URqqz4jr9XEd5/p3cidD4KZMv0WDH+p9xGEzv9h4wIqxCB0YIMeF1RFPYiucoAlU8yHoJyGjphSaDIiBwybFDC6cPyUqqVjj9V22hip8SCH+hoIlhtQUy7qwJFBpEWMizY7IQHqg+pM9wfAXyxSCHDBi3O8xBU4xM3JlQHilS0kAHbGSZrfMg8DWLLehawJlBk7JQQMkaweX2xhM21BRRXU1JRFCLiQwZwc5+YwuZLSWnbA8xGEzt9wH65BdwiI9awOW/uoQkhgSLTiciQAV9ec4HrFqBzBFeAPzCA6Dli8CqwcKBrTxHS17zew200sVNU9gaLFOy09gRcP0QGjPH3u4dUpVzZv4MIGYgTGRFiDRhnpx+z+lQyi/Hp6m/BAeHbwJM1YOg6vg87D1KgcSkhLV1DXCWXrOND92JwMqJWQht1RDHZiwFeIi0/3togIfIkbbKfBr4nirMpaeZbH6Ft7VA7uE57ohD72rjwjoQVfF2Etr3CbqKN0HsTuQhXw9vbExohtK3hDH0d53lvIm7bF48vwIg3YMcaXWQVyk5UQWjXaHjaAW2Ntl8nhDcWz/tL0Vv3hGCBH8XyUs0ThbEm8b+pFpt/fysm/Hc6u9HXRKv431Sz3SRipNsIznuECfu83z7BQfrwezHhb79/EDBRbyRh5L36OFUQmv3Bl736pm/tbo3wct5C8e6kWrVH6JLPPeHUFmF67sn0DV+tEaZn12gbocFqizBz/hB/hhSl1vowPUNqOF60RJg9B0w5GIRQS4RXZ7nx5/ExastKs+fxzZppO4TXdyqY9abtEN7ci2H0Vs+WCAdXhLRzJUC1Qnh7Pw3ljiGwWiHM3TFk8v7gVghz90SZvEC4DcKCu74o97UB1QJh0X1tBguMFggzT3gr3psIUhuEbgGhubymecLiuy/NdWLzhCX3l5KvEa5T44Rld9Aai/qNE15dBn11F7Shkdg0Yfld0KY6URIWyxBhxX3epjrxrz+K9ZeRn1Z1J7sxd/qhWGZ+WOW9+v1+guUkUfk2gul5xQbEefX7Fv14W7VKdW+UvIN3Zt7BW0H9dja3bqaQsM9vdnGex3mX7679/9/OewfvH/bVn8LfsHwH75C+g7dk+/geMMO9B9y/kFE8CCsIe/cu96YM5B2/rd4rb1PmZWoIexT4C0N9PeHA7UkOzrlbQVFF2JfcptSN1hMa3kmkSeedQTTCPkzb5CZmcITdfz23PBACCbuehJek2xjCbiPWAwIIu2yotSYKI+yuu6lzMmBCGTS6GPp5TZjAEA6eOklYGeiRhANXy+M9OsWDqlQNTzhwcM8uGJfwK5JtEmHH6sWKepBO2KWqHxAGKYSDJ8Onh6DirGDyXgvh4LETg1H4JbNqGgg7kcJhLJRAOHjS+QY6hS+ARUE64cA5tJjgcHGABgk64WCwbm36RnCMi6ETDpyWFsILlrANEcrR2IJTFT52BKoQxkVjs4yCQyolnYSxqTY3HLkI0R5GmVDWG15DjFx4wDpCM+Fg8NwEIxcRbQDqIJSM6DcJG+ZTJpS2euDGILm0z2fVBioTynx8QXhAEyLBQoXxp5FQ+tUl4e6YGnHhL8n+MysthFLPIfmOlUI8cXjW1DJdhLIj956eEckF8/bamqWRUOpxGkOqUErfwr0dqsKtk1ZCKWcdMkGj5PG7xuFey+DLSDdhLHfnxZSIWR2evNrsLTW4zpxMEMZy92EUiHrOhE2wKNyboItlijCW87heHHx2usuKs/QRcX62yZjNPyz2rm7LzMok4VmOu54uFwcv8oMg3sAi//Qj77BYTtdG0c76D13KKxFmfDZrAAAAAElFTkSuQmCC"} alt="" className='w-100' />
                                {/* <img src="data:image/png;base64,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" alt="" className='w-100' /> */}
                            </label>

                        </div>
                        <div className="col-md-6">
                            <div className='mt-3'><input type="text" placeholder='Project Title' className='form-control' onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} value={projectDetails.title} /></div>
                            <div className='mt-3'><input type="text" placeholder='Technologies Used' className='form-control' onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} value={projectDetails.language} /></div>
                            <div className='mt-3'><input type="text" placeholder='Github Link' className='form-control' onChange={(e) => setProjectDetails({ ...projectDetails, githubLink: e.target.value })} value={projectDetails.githubLink} /></div>
                            <div className='mt-3'><input type="text" placeholder='Website Link' className='form-control' onChange={(e) => setProjectDetails({ ...projectDetails, websiteLink: e.target.value })} value={projectDetails.websiteLink} /></div>
                            <div className='mt-3'><textarea placeholder='Project Overview' rows={4} className='form-control' onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })} value={projectDetails.overview}></textarea></div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClear}>
                        Clear
                    </Button>
                    <Button variant="primary" onClick={addProject}>
                        Add Project
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer
                autoClose={1000} />
        </>
    )
}

export default AddProject