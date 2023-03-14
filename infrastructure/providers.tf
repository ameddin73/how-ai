terraform {
  required_version = ">=1.4.0"

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
