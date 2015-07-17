using System;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Web;

namespace LoyaltyCard.App_Code
{
	public class BarcodeHandler : IHttpHandler
	{
		private const string UrlFormat = "http://www.microscan.com/Barcode/idalin.asp?BARCODE={0}&BAR_HEIGHT=1.25&CODE_TYPE={1}&CHECK_CHAR=N&ROTATE=0&ST=Y&IMAGE_TYPE=1&DPI=118";
		
		public bool IsReusable
		{
			get
			{
				return true;
			}
		}

		public void ProcessRequest(HttpContext context)
		{
			if (context == null)
			{
				throw new ArgumentNullException("context");
			}

			var data = HttpUtility.UrlEncode(context.Request.QueryString["data"]);
			if(String.IsNullOrWhiteSpace(data))
			{
				throw new InvalidOperationException("You must specify data for the barcode.");
			}

			var type = HttpUtility.UrlEncode(context.Request.QueryString["type"]);
			if (String.IsNullOrWhiteSpace(type))
			{
				throw new InvalidOperationException("You must specify the barcode type.");
			}

			var url = String.Format(CultureInfo.InvariantCulture, UrlFormat, data, type);
			var imageData = new WebClient().DownloadData(url);
			context.Response.ContentType = "image/jpg";
			context.Response.BinaryWrite(imageData);
		}
	}
}