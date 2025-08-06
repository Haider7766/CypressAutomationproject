pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                bat 'npx cypress install'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                bat 'npx cypress run --reporter mochawesome --reporter-options reportDir=cypress/reports/jsons,reportFilename=index,overwrite=true,html=true,json=false --browser chrome'
            }
        }
    }

    post {
        always {
            publishHTML(target: [
                reportDir: 'cypress/reports/jsons',
                reportFiles: 'index.html',
                reportName: 'Cypress Test Report',
                allowMissing: false,
                keepAll: true,
                alwaysLinkToLastBuild: true
            ])
        }

        success {
            emailext(
                to: 'haabbasi626@gmail.com',
                subject: "Build SUCCESS - #${env.BUILD_NUMBER}",
                body: """The Jenkins build was successful!

✔ Job: ${env.JOB_NAME}
✔ Build Number: ${env.BUILD_NUMBER}
✔ Result: ${currentBuild.currentResult}
✔ Report: ${env.BUILD_URL}Cypress_20Test_20Report/
""",
                attachmentsPattern: 'cypress/reports/jsons/index.html'
            )
        }

        failure {
            emailext(
                to: 'haabbasi626@gmail.com',
                subject: "Build FAILED - #${env.BUILD_NUMBER}",
                body: """The Jenkins build has failed.

✖ Job: ${env.JOB_NAME}
✖ Build Number: ${env.BUILD_NUMBER}
✖ Result: ${currentBuild.currentResult}
✖ Report (if available): ${env.BUILD_URL}Cypress_20Test_20Report/
""",
                attachmentsPattern: 'cypress/reports/jsons/index.html'
            )
        }
    }
}
