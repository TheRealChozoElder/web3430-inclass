export const indexPage = (req, res, next) => {
    res.render('layout', { content: 'index', title: 'Top 10 Movies Nathan Beach' })
}

export const aboutPage = (req, res, next) => {
    res.render('layout', { content: 'about', title: 'Top 10 Movies Nathan Beach' })
}

export const contactPage = (req, res, next) => {
    res.render('layout', { content: 'contact', title: 'Top 10 Movies Nathan Beach' })
}

export const signInPage = (req, res, next) => {
    res.render('layout', { content: 'signin', title: 'Top 10 Movies Nathan Beach' })
}

export const signUpPage = (req, res, next) => {
    res.render('layout', { content: 'signup', title: 'Top 10 Movies Nathan Beach' })
}