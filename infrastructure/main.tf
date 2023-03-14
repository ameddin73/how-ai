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

resource "azurerm_user_assigned_identity" "how-ai" {
  name                = "how-ai"
  resource_group_name = azurerm_resource_group.how-ai.name
  location            = azurerm_resource_group.how-ai.location
}

resource "azurerm_key_vault" "how-ai" {
  name                = "how-ai-key-vault"
  location            = azurerm_resource_group.how-ai.location
  resource_group_name = azurerm_resource_group.how-ai.name
  tenant_id           = data.azurerm_client_config.current.tenant_id

  sku_name = "standard"
}

resource "azurerm_role_assignment" "how-ai" {
  scope                = azurerm_key_vault.how-ai.id
  role_definition_name = "Key Vault Secrets User"
  principal_id         = azurerm_user_assigned_identity.how-ai.principal_id
}

resource "azurerm_linux_function_app" "how-ai" {
  name                = "how-ai-linux-function-app"
  resource_group_name = azurerm_resource_group.how-ai.name
  location            = azurerm_resource_group.how-ai.location

  storage_account_name       = azurerm_storage_account.how-ai.name
  storage_account_access_key = azurerm_storage_account.how-ai.primary_access_key
  service_plan_id            = azurerm_service_plan.how-ai.id

  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.how-ai.id]
  }

  key_vault_reference_identity_id = azurerm_user_assigned_identity.how-ai.id

  site_config {}
}
