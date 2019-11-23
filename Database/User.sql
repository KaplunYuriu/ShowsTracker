USE [ShowsTracker]
GO

/****** Object:  Table [dbo].[User]    Script Date: 11/23/2019 3:55:56 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[User](
	[User_PK] [int] IDENTITY(1,1) NOT NULL,
	[EmailAddress] [varchar](100) NULL,
	[FullName] [varchar](100) NULL,
	[PasswordHash] [varchar](100) NOT NULL,
	[PasswordSalt] [varchar](100) NOT NULL,
	[IsDeleted] [bit] NOT NULL
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF_User_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

