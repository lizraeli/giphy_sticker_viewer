export interface GIF {
  // By default, this is almost always "gif"
  type: string;

  // This GIF's unique ID
  id: string;

  // The title that appears on giphy.com for this GIF
  title: string;

  // The unique slug used in this GIF's URL
  slug: string;

  // The unique URL for this GIF
  url: string;

  // The unique bit.ly URL for this GIF
  bitly_url: string;

  // A URL used for embedding this GIF
  embed_url: string;

  // The username this GIF is attached to, if applicable
  username: string;

  // The page on which this GIF was found
  source: string;

  // The MPAA-style rating for this content.
  // Examples include Y, G, PG, PG-13 and R
  rating: string;

  // The top level domain of the source URL.
  source_tld: string;

  // The URL of the webpage on which this GIF was found.
  source_post_url: string;

  // The date on which this GIF was last updated.
  update_datetime: string;

  // The date this GIF was added to the GIPHY database.
  create_datetime: string;

  // The creation or upload date from this GIF's source.
  import_datetime: string;

  // The date on which this gif was marked trending, if applicable.
  trending_datetime: string;

  // An object containing data about the user
  // associated with this GIF, if applicable.
  user: User;

  // An object containing data for various
  // available formats and sizes of this GIF.
  images: Images;
}

export interface User {
  // The URL for this user's avatar image.
  avatar_url: string;

  // The URL for the banner image that appears atop this user's profile page.
  banner_url: string;

  // The URL for this user's profile.
  profile_url: string;

  // The username associated with this user.
  username: string;

  // The display name associated with this user (contains formatting the base username might not).
  display_name: string;

  // The Twitter username associated with this user, if applicable.
  twitter: string;
}

export interface Images {
  // Data surrounding versions of this GIF
  // with a fixed height of 200 pixels.
  // Good for mobile use.
  fixed_height: Image & {
    // The size of this GIF in bytes.
    size: string;

    // The URL for this GIF in .MP4 format.
    mp4: string;

    // The size in bytes of the .MP4 file corresponding to this GIF.
    mp4_size: string;

    // The URL for this GIF in .webp format.
    webp: string;

    // The size in bytes of the .webp file corresponding to this GIF.
    webp_size: string;
  };

  // Data surrounding a static image of this GIF
  // with a fixed height of 200 pixels.
  fixed_height_still: Image;

  // Data surrounding versions of this GIF
  // with a fixed height of 200 pixels
  // and the number of frames reduced to 6.
  fixed_height_downsampled: Image & {
    // The size of this GIF in bytes.
    size: string;

    // The URL for this GIF in .webp format.
    webp: string;

    // The size in bytes of the .webp file corresponding to this GIF.
    webp_size: string;
  };

  // Data surrounding versions of this GIF
  // with a fixed width of 200 pixels.
  // Good for mobile use.
  fixed_width: Image & {
    // The size of this GIF in bytes.
    size: string;

    // The URL for this GIF in .MP4 format.
    mp4: string;

    // The size in bytes of the .MP4 file corresponding to this GIF.
    mp4_size: string;

    // The URL for this GIF in .webp format.
    webp: string;

    // The size in bytes of the .webp file corresponding to this GIF.
    webp_size: string;
  };

  // Data surrounding a static image of this GIF
  // with a fixed width of 200 pixels.
  fixed_width_still: Image;

  fixed_width_downsampled: Image & {
    // The size of this GIF in bytes.
    size: string;

    // The URL for this GIF in .webp format.
    webp: string;

    // The size in bytes of the .webp file corresponding to this GIF.
    webp_size: string;
  };

  // Data surrounding versions of this GIF
  // with a fixed height of 100 pixels.
  // Good for mobile keyboards.
  fixed_height_small: Image & {
    // The size of this GIF in bytes.
    size: string;

    // The URL for this GIF in .MP4 format.
    mp4: string;

    // The size in bytes of the .MP4 file corresponding to this GIF.
    mp4_size: string;

    // The URL for this GIF in .webp format.
    webp: string;

    // The size in bytes of the .webp file corresponding to this GIF.
    webp_size: string;
  };
  fixed_height_small_still: Image;

  // Data surrounding versions of this GIF
  // with a fixed width of 100 pixels.
  // Good for mobile keyboards.
  fixed_width_small: Image & {
    // The size of this GIF in bytes.
    size: string;

    // The URL for this GIF in .MP4 format.
    mp4: string;

    // The size in bytes of the .MP4 file corresponding to this GIF.
    mp4_size: string;

    // The URL for this GIF in .webp format.
    webp: string;

    // The size in bytes of the .webp file corresponding to this GIF.
    webp_size: string;
  };

  // Data surrounding a static image of this GIF
  // with a fixed width of 100 pixels.
  fixed_width_small_still: Image;

  // Data surrounding a version of this GIF
  // downsized to be under 2mb.
  downsized: Image & {
    // The size of this GIF in bytes.
    size: string;
  };
  // Data surrounding a static preview image
  // of the downsized version of this GIF.
  downsized_still: Image;

  // Data surrounding a version of this GIF
  // downsized to be under 8mb.
  downsized_large: Image & {
    // The size of this GIF in bytes.
    size: string;
  };

  // Data surrounding a version of this GIF
  // downsized to be under 5mb.
  downsized_medium: Image & {
    // The size of this GIF in bytes.
    size: string;
  };

  // Data surrounding a version of this GIF
  // downsized to be under 200kb.
  downsized_small: Image & {
    // The size of this GIF in bytes.
    size: string;
  };

  // Data surrounding the original version of this GIF. Good for desktop use.
  original: Image & {
    // The size of this GIF in bytes.
    size: string;

    // The number of frames in this GIF.
    frames: string;

    // The URL for this GIF in .MP4 format.
    mp4: string;

    // The size in bytes of the .MP4 file corresponding to this GIF.
    mp4_size: string;

    // The URL for this GIF in .webp format.
    webp: string;

    // The size in bytes of the .webp file corresponding to this GIF.
    webp_size: string;
  };

  // Data surrounding a static preview image of the original GIF.
  original_still: Image;

  // Data surrounding a version of this GIF
  //  set to loop for 15 seconds.
  looping: {
    // The URL for this GIF in .MP4 format.
    mp4: string;
  };

  // Data surrounding a version of this GIF limited to 50kb
  // that displays the first 1-2 seconds of the GIF.
  preview_gif: Image & {
    // The size of this GIF in bytes.
    size: string;
  };

  // Data surrounding a version of this GIF
  // in .MP4 format limited to 50kb
  // that displays the first 1-2 seconds of the GIF.
  preview: {
    // The URL for this GIF in .MP4 format.
    mp4: string;

    // The size of this file in bytes.
    mp4_size: string;

    // The width of this file in pixels.
    width: string;

    // The height of this file in pixels.
    height: string;
  };
}

export interface Image {
  // The publicly-accessible direct URL for this GIF.
  url: string;

  // The width of this GIF in pixels.
  width: string;

  // The height of this GIF in pixels.
  height: string;
}
