terraform {
  required_version = ">=1.4.0"

  backend "azurerm" {
    resource_group_name = "tf-infra"
    container_name      = "tfstate"
    key                 = "terraform.tfstate"
  }

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.47.0"
    }
  }
}

provider "azurerm" {
  features {}

  subscription_id = var.azure_subscription
}

data "azurerm_client_config" "current" {}

