const inquirer = require('inquirer');
const { generate } = require('rxjs');
const { write, copyFile } = require('fs');

let team = [];

const promptManagerTeam = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is your name?',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("Please enter your name");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is your employee identification?'
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is your email?',
                validate: emailInput => {
                    if(emailInput.includes('@')) {
                        return true;
                    } else {
                        return ("Please enter a valid email address!");
                    }
                }
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: 'What is your office number?'
            },
        ])
        .then(({name, id, email, officeNumber }) => {
            this.manager = new this.Manager(name, id, email, officeNumber);
            team.push(this.manager);
            console.log(team);
            promptManagerTeam()
        })
};

const promptMemberTeam = () => {

    inquirer
        .prompt({
            type: 'list',
            message: 'Would you like to add team member?',
            name: 'addMember',
            choices: ['Yes', 'No']
        })
        .then(({ addMember }) => {
            if (addMember === 'Yes') {
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            message: 'Which team member would you like to add?',
                            name: 'role',
                            choices: ['Engineer', 'Intern']
                        },
                        {
                            type: 'input',
                            name: 'name',
                            message: 'Name ot team member',
                            validate: nameInput => {
                                if (nameInput) {
                                    return true;
                                } else {
                                    console.log("Please enter name!");
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'input',
                            id: 'id',
                            message: 'What is the employee identification number?'
                        },
                        {
                            type: 'input',
                            name: 'email',
                            message: 'What is your employee email?'
                        },
                        // will ask question if answer.role === Engineer else it wont ask the question!
                        {
                            type: 'input',
                            name: 'github',
                            message: 'What is the link to your employee github site?',
                            when: (answers) => answers.role === 'Engineer'
                        },
                        // if answer is Intern this question will be asked instead!
                        {
                            type: 'input',
                            name: 'school',
                            message: 'What is the school your intern is attending?',
                            when: (answer) => answer.role === 'Intern'
                        }
                    ])
                    .then(({ name, id, role, github, school }) => {
                        //Engineer section
                        if (role === 'Engineer') {
                            this.engineer = new this.Engineer(name, id, email, github);
                            team.push(this.engineer);
                            console.log(team);
                            promptMemberTeam()
                        } else {
                            // Intern section
                            this.intern = new Intern(name, id, email, school);
                            team.push(this.intern);
                            console.log(team);
                            promptMemberTeam()
                        }
                    })
            } else {
                console.log("Your team page has been generated");
                console.log(team);

                const htmlPage = generatePage(team);

                write(htmlPage);
                copyFile()
            }
        });
};

promptManagerTeam()