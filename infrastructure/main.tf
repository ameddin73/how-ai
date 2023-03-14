resource "azurerm_resource_group" "how-ai" {
  name     = "how-ai-rg"
  location = "West Europe"
}

resource "azurerm_storage_account" "how-ai" {
  name                     = "linuxfunctionappsa"
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

  identity {
    type = "SystemAssigned"
  }

  app_settings = {
    API_KEY = "",
  }
}

resource "azurerm_cognitive_account" "how-ai" {
  name                = "how-ai-account"
  location            = azurerm_resource_group.how-ai.location
  resource_group_name = azurerm_resource_group.how-ai.name
  kind                = "OpenAI"

  sku_name = "S0"
}

resource "azurerm_role_assignment" "how-ai-cognitive-user" {
  for_each = {
    "user"     = data.azurerm_client_config.current.object_id,
    "function" = azurerm_linux_function_app.how-ai.identity[0].principal_id
  }
  scope                = azurerm_storage_account.how-ai.id
  role_definition_name = "Cognitive Services User"
  principal_id         = each.value
}
