-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema lavie
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema lavie
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `lavie` DEFAULT CHARACTER SET utf8 ;
USE `lavie` ;

-- -----------------------------------------------------
-- Table `lavie`.`pacientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lavie`.`pacientes` (
  `paciente_id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `idade` DATE NOT NULL,
  `status` INT NOT NULL,
  PRIMARY KEY (`paciente_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `lavie`.`psicologos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lavie`.`psicologos` (
  `psicologo_id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(256) NOT NULL,
  `apresentacao` VARCHAR(255) NOT NULL,
  `status` INT NOT NULL,
  PRIMARY KEY (`psicologo_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `lavie`.`atendimentos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lavie`.`atendimentos` (
  `atendimento_id` INT NOT NULL AUTO_INCREMENT,
  `psicologo_paciente` INT NOT NULL,
  `paciente_psicologo` INT NOT NULL,
  `data_atendimento` DATETIME NOT NULL,
  `observacao` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`atendimento_id`),
  INDEX `psicologo_paciente_idx` (`psicologo_paciente` ASC) VISIBLE,
  INDEX `paciente_psicologo_idx` (`paciente_psicologo` ASC) VISIBLE,
  CONSTRAINT `paciente_psicologo`
    FOREIGN KEY (`paciente_psicologo`)
    REFERENCES `lavie`.`pacientes` (`paciente_id`),
  CONSTRAINT `psicologo_paciente`
    FOREIGN KEY (`psicologo_paciente`)
    REFERENCES `lavie`.`psicologos` (`psicologo_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;