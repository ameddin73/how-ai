resource "azurerm_resource_group" "how-ai" {
  name     = "how-ai-rg"
  location = "West US"
}

resource "azurerm_storage_account" "how-ai" {
  name                     = "howaisa"
  resource_group_name      = azurerm_resource_group.how-ai.name
  location                 = azurerm_resource_group.how-ai.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_service_plan" "how-ai" {
  name                = "how-ai-app-service-plan"
  resource_group_name = azurerm_resource_group.how-ai.name
  location            = azurerm_resource_group.how-ai.location
  os_type             = "Linux"
  sku_name            = "Y1"
}

resource "azurerm_linux_function_app" "how-ai" {
  name                = "how-ai-linux-function-app"
  resource_group_name = azurerm_resource_group.how-ai.name
  location            = azurerm_resource_group.how-ai.location

  storage_account_name       = azurerm_storage_account.how-ai.name
  storage_account_access_key = azurerm_storage_account.how-ai.primary_access_key
  service_plan_id            = azurerm_service_plan.how-ai.id

  site_config {}
}

resource "azurerm_app_service_source_control" "how-ai" {
  app_id   = azurerm_linux_function_app.how-ai.id
  repo_url = "https://github.com/ameddin73/how-ai/tree/main/how-ai-backend"
  branch   = "main"
}
