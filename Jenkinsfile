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
                bat 'npx cypress run --reporter mochawesome --reporter-options reportDir=cypress/reports/json,overwrite=true,html=false,json=true --browser chrome'
            }
        }

        stage('Merge & Generate HTML Report') {
            steps {
                // Create the HTML folder if it doesn't exist
                bat 'mkdir cypress\\reports\\html'

                // Merge all JSON files
                bat 'npx mochawesome-merge cypress/reports/json/*.json > cypress/reports/report.json'

                // Generate final HTML report
                bat 'npx marge cypress/reports/report.json -f final-report -o cypress/reports/html'
            }
        }
    }

    post {
        always {
            // Publish HTML report correctly
            publishHTML(target: [
                reportDir: 'cypress/reports/html',
                reportFiles: 'final-report.html',
                reportName: 'Cypress Test Report',
                allowMissing: true,
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
                attachmentsPattern: 'cypress/reports/html/final-report.html'
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
                attachmentsPattern: 'cypress/reports/html/final-report.html'
            )
        }
    }
}
