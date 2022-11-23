# Import Data

## Purpose
To import cms files into mysql

## Prerequisite
1. Make sure MySql is running
2. Setup a user on mysql make sure it is using legacy authentication
3. Install Homebrew
  ```
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  echo "# Homebrew\nexport PATH=/opt/homebrew/bin:\$PATH" >> .zshrc
  source ~/.zshrc

4. Install nvm
  ```
  brew update
  brew install nvm
  mkdir ~/.nvm

  echo "export NVM_DIR=~/.nvm\nsource \$(brew --prefix nvm)/nvm.sh" >> .zshrc
  source ~/.zshrc
  ```

5. Install the required packages by running this command
  ```
  yarn
  ```

4. Use any of the following commands

### Commands

> Import NPI Endpoints
> `node index.js --host=localhost --user=loader --password=Meshcare112 --database=dir_data --fileType=npiEndpoints --filePath=/Users/<LOGGED IN USER>/Downloads/NPPES_Data_Dissemination_November_2022/endpoint_pfile_20050523-20221113.csv`

> Import NPI Data **NOT COMPLETE**
> `node index.js --host=localhost --user=loader --password=Meshcare112 --database=dir_data --fileType=npiData --filePath=/Users/<LOGGED IN USER>/Downloads/NPPES_Data_Dissemination_November_2022/npidata_pfile_20050523-20221113.csv`

> Import NPI npiOther
> `node index.js --host=localhost --user=loader --password=Meshcare112 --database=dir_data --fileType=npiOther --filePath=/Users/<LOGGED IN USER>/Downloads/NPPES_Data_Dissemination_November_2022/othername_pfile_20050523-20221113.csv`

> Import NPI npiPractice
> `node index.js --host=localhost --user=loader --password=Meshcare112 --database=dir_data --fileType=npiPractice --filePath=/Users/<LOGGED IN USER>/Downloads/NPPES_Data_Dissemination_November_2022/pl_pfile_20050523-20221113.csv`


### Load Times Running Against Localhost
```
Npi Endpoints File
  Rows Imported: 475496
  Process took: 338 seconds

Npi Data File
  Rows Imported: 672558
  Process took: 456 seconds

Npi Practice File
  Rows Imported: 672558
  Process took: 456 seconds

Npi Other File
  Rows Imported: 590153
  Process took: 402 seconds

```