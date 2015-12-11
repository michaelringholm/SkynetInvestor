CREATE TABLE [dbo].[PortfolioAsset]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [PortfolioId] INT NOT NULL, 
    [AssetAcronym] NVARCHAR(50) NOT NULL
)
