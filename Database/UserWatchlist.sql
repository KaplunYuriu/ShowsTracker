USE [ShowsTracker]
GO

/****** Object:  Table [dbo].[UserWatchlist]    Script Date: 11/23/2019 3:56:10 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserWatchlist](
	[UserWatchlist_PK] [int] IDENTITY(1,1) NOT NULL,
	[User_FK] [int] NOT NULL,
	[ShowId] [varchar](20) NULL,
	[SeriesId] [varchar](20) NULL,
	[EpisodeId] [varchar](20) NULL,
	[SeasonNumber] [int] NULL,
	[EpisodeNumber] [int] NULL,
	[Status] [smallint] NULL,
 CONSTRAINT [PK_UserWatchlist] PRIMARY KEY CLUSTERED 
(
	[UserWatchlist_PK] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

